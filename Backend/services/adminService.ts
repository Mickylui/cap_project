import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";

export class AdminService {
    constructor(private knex: Knex) {}

    // async getReportedUser() {
    //     //get user data & complaint reason
    // }
    // async changeUsersAccess() {}
    // async getAllProduct() {}
    // async createProduct() {}
    // async deleteProduct() {}
    // async editProduct() {}
    // async deleteProductSize() {}
    // async searchProduct() {}

    async getOrder() {
        try {
            const OrderData = (
                await this.knex.raw(`
            SELECT
                order_history.id AS order_id,
                order_history.delivery_address,
                order_history.contact,
                users.account_name,
                users.icon,
                users.id AS user_id,
                array_agg(products.name || ',' || order_details.order_size || ',' || order_details.order_quantity || ',' || order_details.order_unit_price) name_size_quantity_price
            FROM order_history
                LEFT JOIN users ON users.id = order_history.user_id
                LEFT JOIN order_details ON order_details.order_history_id = order_history.id
                LEFT JOIN products ON products.id = order_details.product_id
            WHERE order_history.status != 'success'
            AND order_history.status != 'cancel'
            GROUP BY (
                    order_history.id,
                    users.id,
                    users.account_name
                )
            ORDER BY order_history.updated_at DESC`)
            ).rows;
            console.log("OrderData:", OrderData);
            return OrderData;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async shipping() {}

    // async addPost() {}
    // async editPost() {}
    // async getAdminPost() {}
    // async deleteAdminPost() {}
    // async getReportedPost() {}
    // async deleteUserPost() {}
    // async createBanner() {}
    // async getAllBanner() {}
}
