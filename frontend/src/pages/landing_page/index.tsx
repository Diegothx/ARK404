import { useState, JSX, useEffect, Dispatch, SetStateAction } from "react";
import { Tabs, ServerHealthStatus} from "../../TabContainer"; 
import { QuotesService } from "../../api"; 
import { Rain } from "../../components/Rain"; 

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
          width: "100%",
          height: "100%",
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
          position: "relative",
          width: "1500px",
          borderRadius: "20px",
          height: "90%",  
          border: "5px double purple",
          margin: "auto",
          zIndex: "1",
          color: "#ff01ff",
          alignContent: "center",
          textAlign: "center",
          backgroundColor: "rgba(53, 6, 59, 0.3)",
          display:'flex',
          flexDirection:'column', 
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
            height:'250px',
          }}
        >
          <h2>ROBCO INDUSTRIES (TM) UNIFIED OPERATING SYSTEM</h2>
          <h2>The world you grew up to join no longer exists</h2>
          <h2> <span style={{color: serverHealth === ServerHealthStatus.HEALTHY ? "limegreen" : "red",}}>•</span> {quote}...</h2>
        </div>  
        <div
          style={{
            maxWidth:'45%',
            overflow: "hidden" ,
            position: "absolute",
            right: "10px",
            top: "10px", 
        }}> 
        <div
          style={{  
            display: "flex",
            gap: "10px",
            
            justifyContent: "flex-end",
          }}
        >  
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
         {showIcons && (
           <Guestbook  />
         )}
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
                  onClick={() => setCurrentTab(Tabs.DRAWING)} fill="#ff00cfa0" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                  width="80px" height="80px" viewBox="0 0 334.8 334.8"  
                  >
                <g>
                  <g>
                    <path d="M310.025,89.118h-45.141l-7.53,16.2H307.8h2.226c6.212,0,8.574,2.36,8.574,8.575v150.251
                      c0,6.217-2.362,13.975-8.574,13.975H30.175c-6.215,0-13.975-7.758-13.975-13.975V113.893c0-6.215,7.76-8.575,13.975-8.575h195.46
                      l7.535-16.2H30.175C15,89.118,0,98.718,0,113.893v150.251c0,15.172,15,30.175,30.175,30.175h279.851
                      c15.177,0,24.774-15.003,24.774-30.175V113.893C334.8,98.718,325.202,89.118,310.025,89.118z"/>
                    <polygon points="207.89,144.159 207.984,143.269 208.364,142.453 220.609,116.118 86.4,116.118 86.4,267.318 297,267.318 
                      297,116.118 252.323,116.118 234.441,154.582 233.998,155.531 233.233,156.246 214.244,174.036 203.645,183.972 205.185,169.524 
                          "/>
                    <path d="M27,267.318h48.6v-151.2H27V267.318z M37.8,126.918h27v21.6h-27V126.918z M37.8,159.318h27v21.6h-27V159.318z
                      M51.3,221.418c7.831,0,14.175,6.344,14.175,14.175s-6.344,14.175-14.175,14.175s-14.175-6.344-14.175-14.175
                      S43.469,221.418,51.3,221.418z"/>
                    <polygon points="278.026,48.051 261.742,40.481 256.753,51.21 273.101,58.64 		"/>
                    <polygon points="268.545,68.43 252.197,61 239.124,89.118 231.588,105.318 226.568,116.118 213.263,144.731 210.558,170.097 
                      229.542,152.304 246.375,116.118 251.396,105.318 258.931,89.118 		"/>
                  </g>
                </g>
                </svg>
                <svg 
                  style={{ cursor: "pointer" }}
                  height="80px" width="80px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"  
                  viewBox="0 0 512 512" 
                  onClick={() => setCurrentTab(Tabs.VIDEOGAME)} > 
                  <g>
                    <path className="st0" d="M389.486,226.898H122.515C54.852,226.898,0,281.746,0,349.413c0,67.659,54.852,122.514,122.515,122.514
                      c42.645,0,80.192-21.812,102.128-54.855h62.711c21.94,33.043,59.491,54.855,102.132,54.855
                      c67.667,0,122.514-54.855,122.514-122.514C512,281.746,457.153,226.898,389.486,226.898z M176.155,364.052h-37.794v37.778h-32.916
                      v-37.778H67.659v-32.928h37.786v-37.786h32.916v37.786h37.794V364.052z M358.495,363.774c-7.929,7.929-20.783,7.929-28.716,0
                      c-7.936-7.929-7.936-20.794,0-28.723c7.933-7.929,20.787-7.929,28.716-0.008C366.424,342.98,366.424,355.846,358.495,363.774z
                      M403.84,409.127c-7.921,7.921-20.779,7.921-28.715-0.008c-7.937-7.929-7.937-20.786,0-28.715
                      c7.936-7.929,20.794-7.945,28.715-0.016C411.777,388.333,411.777,401.19,403.84,409.127z M403.84,318.422
                      c-7.921,7.929-20.779,7.929-28.715,0c-7.922-7.929-7.937-20.794,0-28.723c7.936-7.929,20.794-7.929,28.715,0
                      C411.777,297.627,411.777,310.493,403.84,318.422z M449.193,363.774c-7.921,7.929-20.786,7.929-28.724,0
                      c-7.937-7.929-7.937-20.794,0-28.723c7.937-7.929,20.802-7.929,28.724,0C457.122,342.98,457.122,355.846,449.193,363.774z"
                      fill="#ff00cfa0"/>
                    <path className="st0" d="M268.928,110.894c0-2.46,0.49-4.72,1.361-6.802c1.319-3.116,3.548-5.8,6.337-7.69
                      c2.8-1.89,6.09-2.97,9.753-2.97c2.441,0,4.709,0.494,6.792,1.373c3.112,1.311,5.804,3.533,7.69,6.333
                      c1.882,2.8,2.97,6.086,2.97,9.756c0,5.893,1.207,11.593,3.39,16.753c3.282,7.744,8.724,14.293,15.588,18.928
                      c6.849,4.644,15.206,7.374,24.076,7.366c5.912,0,11.612-1.211,16.764-3.394c7.728-3.278,14.285-8.716,18.92-15.58
                      c4.644-6.857,7.367-15.21,7.367-24.073V40.073h-25.608v70.821c0,2.438-0.478,4.705-1.358,6.78c-1.319,3.124-3.556,5.808-6.333,7.69
                      c-2.807,1.881-6.093,2.969-9.753,2.969c-2.437,0-4.705-0.486-6.784-1.365c-3.12-1.311-5.804-3.548-7.69-6.333
                      c-1.886-2.8-2.97-6.1-2.986-9.742c0.016-5.924-1.192-11.616-3.378-16.768c-3.282-7.744-8.72-14.292-15.585-18.928
                      c-6.864-4.651-15.209-7.374-24.084-7.366c-5.908-0.008-11.604,1.203-16.764,3.394c-7.74,3.263-14.292,8.716-18.932,15.58
                      c-4.639,6.857-7.358,15.21-7.358,24.088v104.712h25.603V110.894z"
                      fill="#ff00cfa0"/>
                  </g>
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
                  height:'100%', 
                  marginTop:'-150px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  overflow:'hidden',
                  fontSize: "150px",
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
