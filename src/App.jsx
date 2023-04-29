import Table from "./components/Table"
import Title from "./components/Title"
import UserInfo from "./components/UserInfo"

const App = () => {
  return (
    <div className="h-screen flex flex-col pb-10 pt-5">
      {/* <Title /> */}
      <UserInfo />
      <Table />
    </div>
  )
}

export default App