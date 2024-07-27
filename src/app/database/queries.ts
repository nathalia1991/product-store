import { encode } from "../lib/jwt";
import { Order } from "../model/order";
import { UserEntity } from "./models";
import { openDB } from "./setup";

export async function getUserById(id: number): Promise<UserEntity | null> {
    const db = await openDB();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    return user ?? null;
}

export async function insertUser(entity : UserEntity): Promise<number | undefined> {
    const db = await openDB();
    const userResult = await db.run("INSERT INTO users (name, email, address, phone) VALUES (?, ?, ?, ?)",
      [entity.name, entity.email, entity.address, entity.phone]);
    return userResult.lastID;
}

export async function setPasswordToNewUser(userId: number, password: string): Promise<any | undefined> {
    const db = await openDB();
    const passwordResult = await db.run("INSERT INTO user_auth (id_user, password) VALUES (?, ?)",
      [userId, password]);
    return passwordResult.lastID;
}

export async function fetchUserIdByCredentialsEncoded(attributes : {email: string, password: string}): Promise<String | null> {
    const db = await openDB();
    const user = await db.get('SELECT u.* FROM users u, user_auth ua WHERE u.id = ua.id_user AND u.email = ? AND ua.password = ?',
        [attributes.email, attributes.password]
    );

    if (!user) {
        return null;
    }

    return encode({ id: user.id });
}


export async function fetchOrders(attributes : {id: number}): Promise<Order[] | null> {
    const db = await openDB();
    const orderEntities = await db.all('SELECT o.* FROM orders o WHERE o.id_user = ?',
        [attributes.id]
    );

    if (!orderEntities || orderEntities.length === 0) {
        return [];
    }

    const orderIds = orderEntities.map(order => order.id);
    
    const orderItemEntities = await db.all(`SELECT * FROM order_item WHERE id_order in ( ${orderIds.map(() => '?').join(',')} )`,
        orderIds
    );

    const orderItems = orderItemEntities.map(orderItemEntity => {
        return {
            id: orderItemEntity.id,
            idOrder: orderItemEntity.id_order,
            idProduct: orderItemEntity.id_product,
            quantity: orderItemEntity.quantity,
            unitPrice: orderItemEntity.unit_price
        }
    });

    return orderEntities.map(orderEntity => {
        return {
            id: orderEntity.id,
            date: orderEntity.order_date,
            orderItems: orderItems.filter(orderItem => orderItem.idOrder === orderEntity.id),
            total: orderItems.filter(orderItem => orderItem.idOrder === orderEntity.id).map(orderItem => orderItem.quantity * orderItem.unitPrice).reduce((a, b) => a + b, 0)
        }
    });
}


export async function insertOrder(order : Order): Promise<any | undefined> {
    const db = await openDB();
    const orderResult = await db.run("INSERT INTO orders (id_user) VALUES (?)",
      [order.idUser]);

    const orderId = orderResult?.lastID;

    let insertOrderItemResult = true;

    await db.run('BEGIN TRANSACTION');

    for (let i = 0; i < order.orderItems.length; i++) {
        const orderItem = order.orderItems[i];

        const orderItemEntity = await db.run("INSERT INTO order_item (id_order, id_product, quantity, unit_price) VALUES (?, ?, ?, ?)",
        [orderId, orderItem.idProduct, orderItem.quantity, orderItem.unitPrice]);

        insertOrderItemResult = insertOrderItemResult && !!orderItemEntity?.lastID
      } 

    await db.run('COMMIT');

    return {
        status: insertOrderItemResult ? "OK" : ""
    }
}

