import Table from "./components/Table"
import Title from "./components/Title"

const App = () => {
  return (
    <div className="h-screen flex flex-col pb-10 pt-5">
      <Title />
      <Table />
    </div>
  )
}

export default App