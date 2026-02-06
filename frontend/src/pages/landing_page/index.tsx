import { useState, JSX, useEffect, Dispatch, SetStateAction } from "react";
import { Tabs, ServerHealthStatus} from "../../TabContainer"; 
import { QuotesService } from "../../api"; 
import { Rain } from "../../components/Rain"; // Adjust path as needed

import Guestbook from "../../components/GuestBook";
export function LandingPage({
  serverHealth,
  setCurrentTab, 
  showIcons,
  setShowIcons
}: {
  serverHealth: ServerHealthStatus;
  setCurrentTab: Dispatch<SetStateAction<Tabs>>; 
  showIcons: boolean;
  setShowIcons: Dispatch<SetStateAction<boolean>>;
}) {
  const [rainDrops, setRainDrops] = useState<{
    front: JSX.Element[];
    back: JSX.Element[];
  }>({ front: [], back: [] }); 
  const [quote, setQuote] = useState(""); 
  const handleKeyDown =  (ev: KeyboardEvent) => {
    if (ev.code === "Enter") {
      setShowIcons(true)
    }
  };
 
 
  useEffect(() => { 
    QuotesService.getQuoteGetQuoteGet()
      .then(response => {
        if (response.quote) {
          setQuote(response.quote);
        } else {
          setQuote("The world is quiet here");
        }
      })
      .catch(() => {
        setQuote("The world is quiet here");
      });

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

 

  return (
    <>
      {" "}
      <div  
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: "0",
          backgroundImage: 'url("test.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)",
          opacity: "0.3",
        }}
      />
      <Rain/>
      <div
        style={{
          position: "absolute",
          left: "0",
          width: "100vw",
          height: "100vh",
          bottom: "60px",
          opacity: "0.5",
        }}
      >
        {rainDrops.back.map((drop) => drop)}
      </div>
      
      <div
        style={{
          position: "relative",
          width: "80%", 
          borderRadius: "20px",
          height: "90vh",
          border: "5px double purple",
          margin: "auto",
          zIndex: "1",
          color: "#ff01ff",
          alignContent: "center",
          textAlign: "center",
          backgroundColor: "rgba(53, 6, 59, 0.3)",
          display:'flex',
          flexDirection:'column'
        }}
      >
        <div
          style={{
            backgroundColor: "#ff00cf30",
            borderTopLeftRadius: "15px",
            borderBottomRightRadius: "15px",
            width:'40%',
            paddingRight: "15px",
            paddingLeft: "20px",
            textAlign: "left",
          }}
        >
          <h2>ROBCO INDUSTRIES (TM) UNIFIED OPERATING SYSTEM</h2>
          <h2>The world you grew up to join no longer exists</h2>
          <h2> <span style={{color: serverHealth === ServerHealthStatus.HEALTHY ? "limegreen" : "red",}}>•</span> {quote}...</h2>
        </div>  
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
         {showIcons && (
           <Guestbook  />
         )}
          <a href="mailto:alguien.jpg1@gmail.com">
            <svg
              fill="purple"
              width="50px"
              height="50px"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
              id="memory-email"
            >
              <path d="M1 5H2V4H20V5H21V18H20V19H2V18H1V5M3 17H19V9H18V10H16V11H14V12H12V13H10V12H8V11H6V10H4V9H3V17M19 6H3V7H5V8H7V9H9V10H13V9H15V8H17V7H19V6Z" />
            </svg>
          </a>
          <svg
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open("https://www.instagram.com/algo_.jpg/", "_blank")
            }
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              fill="purple"
            />
            <path
              d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
              fill="purple"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
              fill="purple"
            />
          </svg>
        </div>
        {showIcons ? (
            <div className={`fade-in scale-in`} key="icons">
              <div
                style={{
                  padding: "50px",
                  width: "20%",
                  height: "50%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                }}
              >
                 <svg
                  style={{ cursor: "pointer" }}
                  onClick={() => setCurrentTab(Tabs.DRAWING)}
                  width="80px"
                  height="80px"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1H5L8 3H13V5H3.7457L2.03141 11H4.11144L5.2543 7H16L14 14H0V1Z"
                    fill="#ff00cfa0"
                  />
                </svg>
                {/* 
                <svg
                  style={{ cursor: "pointer" }}
                  onClick={() => setCurrentTab(Tabs.VIDEOGAME)}
                  width="80px"
                  height="80px"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1H5L8 3H13V5H3.7457L2.03141 11H4.11144L5.2543 7H16L14 14H0V1Z"
                    fill="#ff00cfa0"
                  />
                </svg> 
                <svg
                  style={{ cursor: "pointer" }}
                  onClick={() => setCurrentTab(Tabs.GARDERING)}
                  width="80px"
                  height="80px"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1H5L8 3H13V5H3.7457L2.03141 11H4.11144L5.2543 7H16L14 14H0V1Z"
                    fill="#ff00cfa0"
                  />
                </svg>  */}
              </div>
            </div>
          ) : ( 
              <h1
              className="anim-typewriter"
                style={{ 
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  overflow:'hidden',
                  fontSize: "150px",
                  height: "200px",
                  fontFamily: "Alvera Bold Square",
                  cursor: "pointer",
                  flexGrow:1, 
                  alignContent:'center', 
                }}
                onClick={() => setShowIcons(true)}
              >
                <span className="blinking-underscore" style={{width:'69px'}}>{" "}</span>ENTER<span className="blinking-underscore" style={{width:'69px'}}>_</span>
              </h1> 
          )} 
        <div style={{
            minHeight:'180px'}}>

        </div>
        <h1
          style={{
            position: "absolute",
            bottom: "0",
            paddingLeft: "20px",
            left: "0px",
          }}
        >
          There'll be another time...
        </h1>
      </div>
      <img
        src="./walker.png"
        style={{
          position: "absolute",
          bottom: 0,
          width: "20%",
          right: 0,
          zIndex: 1,
          filter: "drop-shadow(20px 20px 10px rgba(23, 0, 228, 0.31)) ",
        }}
      />
    </>
  );
}
