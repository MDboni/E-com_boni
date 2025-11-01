import { CartStore } from "../../Store/CartStore";

const CartSubmitButton = (props) => {
    const { isCartSubmit } = CartStore();

    if(!isCartSubmit){
        return (
            <button onClick={props.onClick} type="button" className={props.className}>
                {props.text}
            </button>
        );
    } else {
        return (
            <button disabled={true} className={props.className}>
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                Processing...
            </button>
        );
    }
};

export default CartSubmitButton;
