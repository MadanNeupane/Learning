import { useNavigate } from "react-router-dom"

const Error = () => {
    let navigate = useNavigate()
  return (
    <div>
        <h1>Oops! That page is not found!</h1>
        <button onClick={()=>navigate("/")}>Go to Home page</button>
    </div>
  )
}

export default Error