import Header from "./Header";

const Login = () => {
    return (
        <div>
            <Header />
            <form className="absolute mx-[36%] z-10 my-30 text-amber-100 p-14 w-auto flex flex-col bg-black/80 gap-4">
                <label className="font-bold text-3xl">Sign In</label>
                <input className="border-gray-300 border bg-gray-500/50 p-3 w-80 rounded-lg" type="text" placeholder="Email"/>
                <input className="border-gray-300 border bg-gray-500/50 p-3 w-80 rounded-lg" type="password" placeholder="Password" />
                <button className="bg-red-700 w-80 p-2 font-bold cursor-pointer">Sign In</button>
            </form>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/ce462eb6-4d7f-4c9a-9f61-93cb535a64fd/web/IN-en-20260105-TRIFECTA-perspective_5ec818ea-11f4-4bff-a409-8f36e9f9a1e2_small.jpg'/>
            <div className="fixed inset-0 bg-black/10 bg-linear-to-b from-black/80 via-transparent to-black/80"></div>
        </div>
    )
}

export default Login;