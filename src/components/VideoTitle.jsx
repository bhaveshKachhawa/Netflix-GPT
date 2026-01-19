const VideoTitle = ({title, overview}) => {
    return (
        <div className="py-50 md:w-1/2 mx-5 md:mx-13 md:mx-40 text-white absolute md:z-50">
            <h1 className="font-bold text-2xl md:text-3xl mb-2 mt-40 md:mt-0">{title}</h1>
            <p className="hidden md:block">{overview}</p>
            <div className="mt-4">
                <button className="px-7 mr-5 mb-3 md:mb-0 py-1 bg-white text-black cursor-pointer hover:opacity-70">▶︎ Play</button>
                <button className="ms:mx-4 px-5 py-1 bg- text-white bg-gray-400/50 cursor-pointer">ⓘ More info</button>
            </div>
        </div>
    )
}

export default VideoTitle;