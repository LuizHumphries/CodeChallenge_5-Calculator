import { useEffect, useState } from "react"
import Button from "./components/Button"

function App() {
  const [calculatorValue, setCalculatorValue] = useState({
    firstNumber: "",
    operator: "",
    secondNumber: "",
  })
  const [resultValue, setResultValue] = useState(0)

  console.log(resultValue)

  const formattedNumber = (() => {
    const number = resultValue
    const [wholeNumber, decimalPart] = number.toString().split(".")

    if (number >= 9999999999) {
      return number.toExponential(2)
    }
    if (number.toString().length > 10) {
      return number.toPrecision(10)
    }
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 10 - wholeNumber.length,
    })
  })()

  const formattedFirstNumber = (() => {
    if (!calculatorValue.firstNumber) {
      return 0
    }
    const number = parseFloat(calculatorValue.firstNumber)

    if (number >= 9999999999) {
      return number.toExponential(2)
    }
    if (number.toString().length > 10) {
      return number.toPrecision(10)
    }
    return number.toLocaleString()
  })()

  const formattedSecondNumber = (() => {
    if (!calculatorValue.secondNumber) {
      return ""
    }
    const number = parseFloat(calculatorValue.secondNumber)

    if (number >= 9999999999) {
      return number.toExponential(2)
    }
    if (number.toString().length > 10) {
      return number.toPrecision(10)
    }
    return number.toLocaleString()
  })()

  useEffect(() => {
    if (!calculatorValue.operator) {
      if (!calculatorValue.firstNumber) {
        setResultValue(0)
      } else {
        setResultValue(parseFloat(calculatorValue.firstNumber))
      }
    } else {
      if (!calculatorValue.secondNumber) {
        setResultValue(0)
      } else {
        setResultValue(parseFloat(calculatorValue.secondNumber))
      }
    }
  }, [calculatorValue])

  function handleClick(value: number | string) {
    if (typeof value === "number") {
      if (!calculatorValue.operator) {
        setCalculatorValue({
          firstNumber: `${calculatorValue.firstNumber}${value}`,
          operator: calculatorValue.operator,
          secondNumber: calculatorValue.secondNumber,
        })
      } else {
        setCalculatorValue({
          firstNumber: calculatorValue.firstNumber,
          operator: calculatorValue.operator,
          secondNumber: `${calculatorValue.secondNumber}${value}`,
        })
      }
    } else if (typeof value === "string") {
      switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
          setCalculatorValue({
            firstNumber: calculatorValue.firstNumber,
            operator: value,
            secondNumber: calculatorValue.secondNumber,
          })
          break
        case ",":
          if (!calculatorValue.operator) {
            setCalculatorValue({
              firstNumber: `${calculatorValue.firstNumber}.`,
              operator: calculatorValue.operator,
              secondNumber: calculatorValue.secondNumber,
            })
          } else {
            setCalculatorValue({
              firstNumber: calculatorValue.firstNumber,
              operator: calculatorValue.operator,
              secondNumber: `${calculatorValue.secondNumber}.`,
            })
          }
          break
        case "=":
          let result: number
          const operandLeft = parseFloat(calculatorValue.firstNumber)
          const operandRight = parseFloat(calculatorValue.secondNumber)

          switch (calculatorValue.operator) {
            case "+":
              result = operandLeft + operandRight
              break
            case "-":
              result = operandLeft - operandRight
              break
            case "*":
              result = operandLeft * operandRight
              break
            case "/":
              result = operandLeft / operandRight
              break
            default:
              result = operandRight
          }
          setResultValue(result)
          setCalculatorValue({
            firstNumber: result.toString(),
            operator: "",
            secondNumber: "",
          })
          break
        case "CE":
          setCalculatorValue({
            firstNumber: "",
            operator: "",
            secondNumber: "",
          })
          setResultValue(0)
          break
        case "C":
          if (!calculatorValue.operator) {
            setCalculatorValue({
              firstNumber: "",
              operator: "",
              secondNumber: "",
            })
          } else {
            setCalculatorValue({
              firstNumber: calculatorValue.firstNumber,
              operator: calculatorValue.operator,
              secondNumber: "",
            })
            break
          }
        case "±":
          setResultValue(Math.round(resultValue))
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-backgroud_app">
      <div
        className="
        shadow-[inset_0_6px_8px_rgba(255,255,255,0.1)
        shadow-[inset_0_-4px_5px_rgba(255,255,255,0.22)
        h-[566px]
        w-[356px]
        flex-col
        justify-between
        rounded-[48px]
        bg-calculator_color
        shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        shadow-[0_188px_52px_rgba(0,0,0,0.01)]
        shadow-[0_120px_48px_rgba(0,0,0,0.04)]
        shadow-[0_68px_41px_rgba(0,0,0,0.15)]
        shadow-[0_30px_30px_rgba(0,0,0,0.26)]
        shadow-[0_8px_17px_rgba(0,0,0,0.29)]
        "
      >
        <div className="mx-[36px] mt-[54px] h-[86px] w-[288px] flex-col">
          <div className="mx-[18px] h-full ">
            <div className="h-[28px] text-right text-[#6B6B6B]">
              {formattedFirstNumber !== null ? formattedFirstNumber : 0}
              {calculatorValue.operator ? ` ${calculatorValue.operator} ` : ""}
              {formattedSecondNumber !== null ? formattedSecondNumber : ""}
              {calculatorValue.operator === "=" ? ` = ${formattedNumber}` : ""}
            </div>
            <div className="align-center mt-[8px] flex h-[50px] items-center justify-between text-3xl">
              <div className="text-[#948a8a62]">=</div>
              <div className="text-[#EBEBEB]">{formattedNumber}</div>
            </div>
          </div>
        </div>
        <div className="mx-[32px] mb-[32px] mt-[26px] grid grid-cols-4 gap-x-[12px] gap-y-[12px]">
          <Button
            onClick={handleClick}
            value={"CE"}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-button_purple_enphasys_color"}
          />
          <Button
            onClick={handleClick}
            value={"C"}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={"%"}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={"/"}
            buttomCollor={"bg-button_purple_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={7}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={8}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={9}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={"*"}
            buttomCollor={"bg-button_purple_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={4}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={5}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={6}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={"-"}
            buttomCollor={"bg-button_purple_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={1}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={2}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={3}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={"+"}
            buttomCollor={"bg-button_purple_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={"±"}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={0}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={","}
            buttomCollor={"bg-button_gray_color"}
            textCollor={"text-[#ffffff]"}
          />
          <Button
            onClick={handleClick}
            value={"="}
            buttomCollor={"bg-button_purple_enphasys_color"}
            textCollor={"text-[#ffffff]"}
          />
        </div>
      </div>
    </div>
  )
}

export default App
