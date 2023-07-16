function BaseLoader({width, height, circlewidth, circleHeight}) {
    return <>
        <div style={{
            width: width,
            height: height
        }} className="flex items-center justify-center bg-stone-500">
                <div className="animate-spin" style={{
                    width: circlewidth,
                    height: circleHeight,
                    display: 'inline-block',
                    color: 'inherit',
                    verticalAlign: 'middle',
                    pointerEvents: "none",
                    border: '0.4em solid currentcolor',
                    borderBottomColor: 'transparent',
                    borderRadius: '50%',
                }}/>
        </div>
    </>
}

export default BaseLoader