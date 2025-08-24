import { BrowserRouter, Route } from "react-router-dom"
import Home from "../../pages/Home.jsx"
export default function Routes(){
    return (
        <>
        <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
                <Route path="/" element={<Home/>}/>

        </Routes>
        </BrowserRouter>
        </>
    )
}