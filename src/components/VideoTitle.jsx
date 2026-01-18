const VideoTitle = ({title, overview}) => {
    return (
        <div className="py-50 w-1/2 mx-40 text-white absolute z-20">
            <h1 className="font-bold text-3xl mb-2">{title}</h1>
            <p>{overview}</p>
            <div className="mt-4">
                <button className="px-7 py-1 bg-white text-black cursor-pointer hover:opacity-70">▶︎ Play</button>
                <button className="mx-4 px-5 py-1 bg- text-white bg-gray-400/50 cursor-pointer">ⓘ More info</button>
            </div>
        </div>
    )
}

export default VideoTitle;