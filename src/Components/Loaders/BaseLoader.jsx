function BaseLoader({width, height}) {
    return <>
        <div style={{
            width: width,
            height: height
        }} className="flex align-middle justify-center">
                <div className="animate-spin" style={{
                    width: 200,
                    height: 200,
                    display: 'inline-block',
                    color: 'inherit',
                    verticalAlign: 'middle',
                    pointerEvents: "none"
                }}/>
        </div>
    </>
}

export default BaseLoader