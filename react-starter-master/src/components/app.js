import React from "react"

class App extends React.Component {

state = {
  gameMatrix: [
    [true, false, true, true, true],
    [false, false, false, true, true],
    [true, false, true, false, true],
    [true, true, false, false, false],
    [true, true, true, false, true]
  ],
  solved: false
}

handleBoxClick = (rowIndex, boxIndex) => {
  const { gameMatrix } = this.state
  const newMatrix = gameMatrix
  newMatrix[rowIndex][boxIndex] = !gameMatrix[rowIndex][boxIndex]

  // change box after unless last
  if (boxIndex === gameMatrix[rowIndex].length - 1) {
    console.log("last box")
  } else {
    newMatrix[rowIndex][boxIndex + 1] = !gameMatrix[rowIndex][boxIndex + 1]
  }

  // change box before unless first
  if (boxIndex === 0) {
    console.log("first box")
  } else {
    newMatrix[rowIndex][boxIndex - 1] = !gameMatrix[rowIndex][boxIndex - 1]
  }

  // change row after unless last
  if (rowIndex === gameMatrix.length - 1) {
    console.log("last row")
  } else {
    newMatrix[rowIndex + 1][boxIndex] = !gameMatrix[rowIndex + 1][boxIndex]
  }

  // change row before unless first
  if (rowIndex === 0) {
    console.log("first row")
  } else {
    newMatrix[rowIndex - 1][boxIndex] = !gameMatrix[rowIndex - 1][boxIndex]
  }

  this.setState({
    gameMatrix: newMatrix
  }, () => this.checkIfSolved())
}

checkIfSolved = () => {
  const solved = this.state.gameMatrix.every(row => {
    return (row.every(box => box === true))
  })
  this.setState({
    solved
  })
  if (solved) console.log("Lights are out!")
}


render() {
  return (
    <div className={this.state.solved
        ? "puzzle-container puzzle-container--solved"
        : "puzzle-container"}>
      <h1>LIGHTS OUT</h1>
      <table>
        <tbody>
          {this.state.gameMatrix.map((rowArray, rowIndex) => (
            <tr key={rowIndex}>
              {rowArray.map((box, boxIndex) =>
                <td key={boxIndex} onClick={() => this.handleBoxClick(rowIndex, boxIndex)}>
                  {this.state.gameMatrix[rowIndex][boxIndex]
                    ? <div className="box boxTrue"></div>
                    : <div className="box boxFalse"></div>}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

}

export default App
