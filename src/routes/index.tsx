import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charles Hsieh — Sales Leader in San Francisco" },
      {
        name: "description",
        content:
          "Charles Hsieh is a San Francisco based sales leader with product and coding experience, helping companies with go-to-market strategy and 10x sales growth.",
      },
      { property: "og:title", content: "Charles Hsieh — Sales Leader in San Francisco" },
      {
        property: "og:description",
        content:
          "Sales leader with product and engineering experience. Blind, Switchboard, Google, HackerRank, LinkedIn.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "/css/bootstrap.css" },
      { rel: "stylesheet", href: "/css/main.css" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic|Raleway:300,400,700&display=swap",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div id="page-top">
      <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
      <div className="container">
      <div className="navbar-header">
      <button type="button" className="navbar-toggle" onClick={() => setOpen((o) => !o)}>
      <i className="fa fa-bars"/>
      </button>
      <a className="navbar-brand" href="#page-top">
      <img src="/img/icons/logo.svg" alt="Charles Hsieh"/>
      </a>
      </div>
      <div className={`collapse navbar-collapse navbar-right navbar-main-collapse${open ? " in" : ""}`}>
      <ul className="nav navbar-nav">
      <li className="hidden">
      <a href="#page-top"/>
      </li>
      <li><a className="page-scroll" onClick={() => setOpen(false)} href="#about" title="About">About</a></li>
      <li><a className="page-scroll" onClick={() => setOpen(false)} href="#resume" title="Work">Work</a></li>
      <li><a className="page-scroll" onClick={() => setOpen(false)} href="#project" title="Projects">Project</a></li>
      <li><a className="page-scroll" href="http://bit.ly/thehsiehfamily" title="Blog">Travel Vlog</a></li>
      <li><a className="page-scroll" onClick={() => setOpen(false)} href="#contact" title="Contact">Contact</a></li>
      </ul>
      </div> </div> </nav>

      <div id="headerwrap">
      <div id="headerfilter">
      <div className="container">
      <div className="row centered">
      <div className="col-lg-8 col-lg-offset-2">
      <h1>Charles Hsieh</h1>
      <h3>I'm a San Francisco based <span>sales leader</span>, with <span>product</span> and <span>coding</span> experiences that helps companies with go-to-market strategies and generate 10x in sales.</h3>
      <ul className="buttons">
      <li><a href="http://bit.ly/thehsiehfamily" className="btn btn-header" target="_blank">Travel Vlog</a></li>
      <li><a href="mailto:charles.hsieh6@gmail.com" className="btn btn-header" target="_blank">Let's Connect</a></li>
      </ul>
      </div></div></div></div></div><section id="about">
      <div className="container">
      <div className="row">
      <div className="col-lg-2 col-lg-offset-5">
      <h2 className="about-text">ABOUT</h2>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-6 col-lg-offset-3">
      <p className="about-subtext">I moved from Taiwan when I was 12 in pursuit the American dream. I was fortunate to attend a top eng school (<a href="http://engineering.illinois.edu/">Go Illini!</a>), and gathered great work experience in amazing companies. I'm also a proud father and husband!</p>
      </div>
      </div>
      <div className="row text-center">
      <div className="col-lg-5 sr-icons">
      <i className="fa fa-money"/>
      <h3>Sales</h3>
      <p>Top performing sales executive @ Google, LinkedIn, HackerRank, and Agilent. Exceeded every individual and team quota.</p>
      </div>
      <div className="col-lg-5 col-lg-offset-2 sr-icons">
      <i className="fa fa-pied-piper"/>
      <h3>Product Management</h3>
      <p>2 years of experiences in converting an idea through UI/UX and product roadmap to validate product market fit.</p>
      </div>
      </div>
      <div className="row text-center">
      <div className="col-lg-5 sr-icons">
      <i className="fa fa-users"/>
      <h3>Leadership</h3>
      <p>Built and led multiple large sales and customer engineering teams @ Google and HackerRank</p>
      </div>
      <div className="col-lg-5 col-lg-offset-2 sr-icons">
      <i className="fa fa-code"/>
      <h3>Development</h3>
      <p>2 years of embedded system and full-stack web RoR development experiences.
      </p></div>
      </div></div></section> <section id="resume">
      <div className="container desc">
      <div className="row">
      <div className="col-lg-2 col-lg-offset-5 text-center">
      <h2 className="hero-text">WORK</h2>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-2 col-lg-offset-1">
      <h5>EDUCATION</h5>
      </div>
      <div className="col-lg-1">
      <img src="/img/icons/icon_illinois.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">B.S. Degree in Electrical and Computer Engineering</span><br/>
      University of Illinois, Urbana-Champaign <span>JUNE 2007</span>
      </p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_tsinghua.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Minor in Chinese</span><br/>
      Tsinghua University <span>SUMMER 2006</span>
      </p>
      </div>	
      </div><br/>
      <hr/>
      </div><div className="container desc">
      <div className="row">
      <div className="col-lg-2 col-lg-offset-1">
      <h5>ADVISORY</h5>
      </div>
      <div className="col-lg-1">
      <img src="/img/icons/icon_pathrise.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Advisor</span><br/>
      Pathrise <span>2021 - CURRENT</span><br/>
      </p>
      <p><span className="more">YC18. Pathrise is an online program for tech professionals that provides 1-on-1 mentorship, training and advice to help you land your next job.</span></p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_welcome.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Investor / Advisor</span><br/>
      Welcome <span>2019 - 2021</span><br/>
      </p>
      <p><span className="more">YC20. Welcome is on a mission to provide access to jaw-dropping virtual experiences that connect, transport and engage people like never before.</span></p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_byteboard.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Advisor</span><br/>
      Byteboard <span>2019 - 2021</span><br/>
      </p>
      <p><span className="more">Backed by Google. Byteboard allows technical interview experience to be more effective, efficient, and equitable for all.</span></p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_agave.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Advisor</span><br/>
      Agave <span>2019 - 2020</span><br/>
      </p>
      <p><span className="more">Backed by SV Angel and Box Group. The free modern, open hiring platform to help you source, track, nurture, and close the best talent.</span></p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_codingdojo.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Advisor</span><br/>
      CodingDojo <span>2017 - 2020</span><br/>
      </p>
      <p><span className="more">Backed by Ulu Ventures. Software is eating the world, and Coding Dojo is changing how people learn software. Coding Dojo is one of the highest-rated coding bootcamps in the industry for both in-person and online learning.</span></p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_growingio.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Advisor</span><br/>
      GrowingIO <span>2015 - 2018</span><br/>
      </p>
      <p><span className="more">Backed by Greylock, NEA and Matrix Partner. GrowingIO is an end-to-end web and mobile analytics platform that provides predictive and actionable business intelligence.</span></p>
      </div>
      </div><br/>
      <hr/>
      </div><div className="container desc">
      <div className="row">
      <div className="col-lg-2 col-lg-offset-1">
      <h5>EXPERIENCES</h5>
      </div>
      <div className="col-lg-1">
      <img src="/img/icons/icon_blind.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Vice President of Sales</span><br/>
      Blind <span>MARCH 2023 - PRESENT</span>
      </p>
      <ul>
      <li><p>Report to Co-founder/CEO. The General manager responsible for helping to build out Blind's B2B product lines and selling into Fortune 500 and large enterprises.</p></li>
      </ul>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_switchboard.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Vice President of Sales</span><br/>
      Switchboard Software <span>SEPTEMBER 2022 - FEBRUARY 2023</span>
      </p>
      <ul>
      <li><p>Reporting into the Co-founder/CEO. Led a sales team of account executives, sales development reps, and sales ops responsible for selling into the largest media, publisher, retail and Ecommerce companies.</p></li>
      </ul>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_google.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Head of Sales, Workspace, New Cloud Products</span><br/>
      Google <span>SEPTEMBER 2019 - SEPTEMBER 2021</span>
      </p>
      <ul>
      <li><p>Led a sales and ops team of 8 responsible for launching and landing two new Workspace SKUs (<a href="https://cloud.google.com/drive-enterprise">Drive Enterprise</a>, <a href="https://workspace.google.com/essentials/">Essentials</a>) and took the product from $0 to $xM in the first 12 months.</p></li>
      </ul>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_google.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Head of Sales, Hire - Google Cloud</span><br/>
      Google <span>SEPTEMBER 2016 - AUGUST 2019</span>
      </p>
      <ul>
      <li><p>Led a team of 45, consists of 3 Frontline Sales Managers, Account Executives, and Sales Dev Reps that were responsible in generating and closing business globally.</p></li>
      <li><p>First sales person for <a href="https://hire.google.com/">Hire by Google</a> when it is in a concept phase. Assisted with product market fit, establish initial pricing model, sales playbook, and took the <a href="https://techcrunch.com/2017/07/18/google-launches-hire-a-new-service-for-helping-businesses-recruit/">product to public launch</a>. It is considered one of the fastest growing departmental SaaS product in history.</p></li>
      </ul>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_hackerrank.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Director, Solutions Engineering</span><br/>
      HackerRank <span>JULY 2014 - JULY 2016</span>
      </p>
      <ul>
      <li><p>Led a team of 13, consists solutions engineers and technical support. It included 2 managers and 11 direct reports.</p></li>
      <li><p>Generated $3M in sales in 2014, and $5.8M in sales in 2015</p></li>
      <li><p>Acted as a product manager for a 20% project - built out the Tutorial domain on the <a href="https://www.hackerrank.com/auth/signup">HackerRank Community</a>. Within 2 months of launch, it became the highest MAU driver in the HackerRank network.</p></li>
      </ul>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_linkedin.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Senior Enterprise Account Manager</span><br/>
      LinkedIn <span>JANUARY 2010 - JUNE 2013</span>
      </p>
      <ul>
      <li><p>Founding member of the SMB Account Management team. Joined when LinkedIn was at 400+ employee.</p></li>
      <li><p>President's Club winner: 2010, 2011, 2012</p></li>
      <li><p>Global Sales Rep of the Year: 2010, 2011</p></li>
      <li><p>Closed $2M, 159% of quota in 2012. Ranked 3 of 250 globally.
      </p></li><li><p>Closed $2.8M, 140% of quota in 2011. Ranked 3 of 100 globally.</p></li>
      <li><p>Closed $2M, 179% of quota in 2010. Ranked 1 of 15 globally.</p></li>
      <li><p>3 promotions in 3 years.</p></li>
      </ul>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_agilent.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Strategic Account Executive</span><br/>
      Agilent Technologies <span>JULY 2007 - NOVEMBER 2009</span>
      </p>
      <ul>
      <li><p>Managed Strategic Accounts with $1M+ deals in the San Francisco Bay Area. Logitech, Boston Scientific, UC Berkeley, Thermo Fisher, Sun Power, etc.</p></li>
      <li><p>Closed $5.3M, 115% of quota in 2009.</p></li>
      <li><p>Closed $6.3M, 135% of quota in 2008.</p></li>
      </ul>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_united_technologies.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Software Engineer</span><br/>
      United Technologies <span>JANUARY 2006 - JANUARY 2007</span>
      </p>
      <ul>
      <li><p>Developed diagnostic, and repeatable software in C++ to simulate all possible Boeing 787 power system errors. The proprietary software successfully reduced all error rates below 0.1% and manual testing cost by $1M+ annually.</p></li>
      </ul>
      </div>
      </div><br/>
      <hr/>
      </div><div className="container desc">
      <div className="row">
      <div className="col-lg-2 col-lg-offset-1">
      <h5>AWARDS</h5>
      </div>
      <div className="col-lg-1">
      <img src="/img/icons/icon_linkedin.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">President's Club</span><br/>
      LinkedIn <span>2010, 2011, 2012</span>
      </p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_linkedin.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Global Rep of The Year</span><br/>
      LinkedIn<span>2010, 2011</span>
      </p>
      <p><span className="more">This is a prestigious global company award that is given out to the top 5 sales rep annually. Consideration criteria includes: performance, internal resourcefulness and leadership.</span></p>
      </div>
      <div className="col-lg-1 col-lg-offset-3">
      <img src="/img/icons/icon_agilent.png" className="img-square" height={60}/>
      </div>
      <div className="col-lg-8 sr-work">
      <p><span className="t">Hardball Award - Most Competitive Wins</span><br/>
      Agilent Technologies <span>2008</span>
      </p>
      <p><span className="more">This is the annual company award that is given out to one sales rep in each region for most wins in competitive situation.</span></p>
      </div>		
      </div><br/><br/>
      </div></section>
      <section id="project">
      <div className="container desc">
      <div className="row">
      <div className="col-lg-2 col-lg-offset-5 text-center">
      <h2 className="hero-text">PROJECTS</h2>
      </div>
      </div>
      <div className="col-lg-4">
      <div className="project-card sr-card">
      <a href="http://www.vacaybug.com" target="_blank" className="card-img"><img className="img-responsive" src="/img/vacaybug.png" alt=""/></a>
      <h3>VACAYBUG</h3>
      <p><span className="more">A social travel website that enable traveler to be more productive. It allows travelers to create social profiles and openly share their itineraries with others.</span></p>
      <p><span className="more">It currently has ~2k monthly unique visitors, over 700 itineraries created in 35 cities, and 12 countries</span></p>
      <a href="http://exploreinspired.com/exploration-made-easy">Blog Featured by Jonathan Ronzio</a>
      <a href="http://wwwhatsnew.com/2015/06/18/vacaybug-una-nueva-plataforma-para-registrar-nuestros-viajes">Mentioned in whatsnew.com</a>
      <a href="https://www.producthunt.com/tech/vacaybug">Featured on Product Hunt</a>
      </div>
      </div>
      <div className="col-lg-4">
      <div className="project-card sr-card">
      <a href="#" className="card-img"><img className="img-responsive" src="/img/3degrees.png" alt=""/></a>
      <h3>3DEGREES DATING APP</h3>
      <p><span className="more">A iOS dating app where everyone is a matchmaker by connecting your single friends with other member’s single friends.</span></p>
      <p><span className="more">The intent is leverage the power of 3rd degree connections to drive a more relevant and validated dating matches.</span></p>
      </div>
      </div>
      </div><br/>
      <br/>
      </section>
      <section id="blog">
      <div id="blogwrap">
      <div className="container">
      <div className="row">
      <div className="col-lg-8 col-lg-offset-2 text-center">
      <h2>Travel Vlog and Medium Posts</h2>
      </div>
      </div>
      <div className="row sr-blog">
      <div className="col-lg-6 col-lg-offset-3 text-center">
      <p><a href="http://bit.ly/thehsiehfamily" className="btn btn-blog" target="_blank">Travel Vlog</a>   <a href="https://medium.com/@chsieh6" className="btn btn-blog" target="_blank">Medium Blog</a></p>
      </div>
      </div></div></div></section>

      <section id="contact">
      <div id="footwrap">
      <div className="container">
      <div className="row">
      <div className="col-lg-8 col-lg-offset-2 text-center">
      <h2>Contact Me</h2>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-6 col-lg-offset-3 text-center">
      <p><a href="https://www.linkedin.com/in/chsieh/" className="btn btn-contact" target="_blank">Let's Connect on LinkedIn</a></p>
      <ul className="social">
      <li><a href="https://www.facebook.com/charleshsieh3/" target="_blank"><i className="fa fa-facebook"/></a></li>
      <li><a href="https://twitter.com/chsieh6" target="_blank"><i className="fa fa-twitter"/></a></li>
      <li><a href="https://www.linkedin.com/in/chsieh" target="_blank"><i className="fa fa-linkedin"/></a></li>
      </ul>
      </div>
      </div></div></div></section>

      <div id="c">
      <p>© 2018 Charles Hsieh</p>
      </div>



    </div>
  );
}
