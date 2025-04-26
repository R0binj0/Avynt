import Example from "./_components/example";
import Feedback from "./_components/feedback";
import First from "./_components/first";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Price from "./_components/price";

const LandingPage = () => {
    return ( 
        <main>
            <Header></Header>
            <First></First>
            <Example></Example>
            <Price></Price>
            {/* <Feedback></Feedback> */}
            <Footer></Footer>
        </main>
    )
}
 
export default LandingPage;