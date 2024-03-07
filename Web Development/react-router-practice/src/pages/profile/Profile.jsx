import { useParams } from "react-router-dom"

const Profile = () => {
    let {username} = useParams()
  return (
    <div><h1>Welcome to {username}'s profile page</h1></div>
  )
}

export default Profile