import WishStore from "../../Store/WishStore";


const WishSubmitButton = (props) => {

    let {isWishSubmit}=WishStore();
    if(isWishSubmit===false){
        return  <button onClick={props.onClick} type="submit" className={props.className}>{props.children}</button>
    }else {
        return (
            <button disabled={true} className={props.className}><div className="spinner-border spinner-border-sm" role="status"></div>Processing...</button>
        );
    }
};
export default WishSubmitButton;