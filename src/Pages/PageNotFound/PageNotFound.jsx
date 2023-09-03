import { useNavigate } from "react-router-dom"

function PageNotFound() {
    const navigate = useNavigate()

    return <div>404 <button onClick={() => {
        navigate("/")
    }}>Home</button></div>
}

export default PageNotFound