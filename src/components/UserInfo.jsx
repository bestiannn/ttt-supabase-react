import useUser from "../global/user";

const UserInfo = () => {
    const { setUserFigure } = useUser();

    return (
        <div className="flex mb-5">
            <p>Select your figure</p>
            <button className="px-5 text-xl" onClick={() => setUserFigure("X")}>
                <i className="nes-icon times"></i>
            </button>
            <button className="px-5 text-xl" onClick={() => setUserFigure("O")}>
                <i className="nes-icon heart"></i>
            </button>
        </div>
    )
}

export default UserInfo