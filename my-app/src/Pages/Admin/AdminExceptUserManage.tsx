import { ShippingManage } from "./ShippingManage";

export function AdminExceptUserManage(props) {

    if (props.link === "products") {
        return <div>Products</div>;
    } else if (props.link === "shipping") {
        return <ShippingManage />;
    } else if (props.link === "platform") {
        return <div>Platform</div>;
    } else if (props.link === "posts") {
        return <div>Posts</div>;
    } else if (props.link === "banners") {
        return <div>Banners</div>;
    }
}

export default AdminExceptUserManage;
