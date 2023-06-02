import "./home-view.css"
import logo from "../images/profileImg.png"
import FloatingNav from "../components/FloatingNav/FloatingNav"

function HomeView() {
  return (
    <div className="hero__image">
      <div className="overlay"></div>
      <h1 className="established-large">EST. 2014</h1>
      <h1 className="hero__text absolute">
        Welcome to the Legendary League of <span className="ex">Ex</span>
        -Athletes
      </h1>
      <div className="circle__center animate-rotate">
        <div className="icon__wrapper icon__wrapper-one">
          <div className="relative icon__one icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-two">
          <div className="relative icon__two icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-three">
          <div className="relative icon__three icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-four">
          <div className="relative icon__four icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-five">
          <div className="relative icon__five icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-six">
          <div className="relative icon__six icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-seven">
          <div className="relative icon__seven icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-eight">
          <div className="relative icon__eight icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-nine">
          <div className="relative icon__nine icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-ten">
          <div className="relative icon__ten icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-eleven">
          <div className="relative icon__eleven icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
        <div className="icon__wrapper icon__wrapper-twelve">
          <div className="relative icon__twelve icon">
            <img src={logo} alt="profile"></img>
          </div>
          <div className="icon__pole"></div>
        </div>
      </div>
      <FloatingNav />
    </div>
  )
}

export default HomeView
