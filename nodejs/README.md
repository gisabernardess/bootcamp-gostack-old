<div id="readme" class="Box-body readme blob js-code-block-container">
  <article class="markdown-body entry-content p-3 p-md-6" itemprop="text">
    <p align="center">
      <img alt="GoStack" src="https://github.com/gisabernardess/bootcamp-gostack-old/blob/main/.github/logo-gostack.png" width="300px" style="max-width:100%;">
    </p>
    <p align="center">NodeJS Introduction</p>
    <h2>:speech_balloon: About</h2>
    <p>HTTP Methods, CRUD Operations, Global/Local Middlewares, Requests, Responses, Next</p>
    <h2>:rocket: Technologies </h2>
    <ul>
      <li><a href="https://nodejs.org/" rel="nofollow">Node.js</a></li>
      <li><a href="https://expressjs.com/" rel="nofollow">Express</a></li>
      <li><a href="https://nodemon.io/" rel="nofollow">nodemon</a></li>
      <li><a href="https://insomnia.rest/" rel="nofollow">Insomnia REST</a></li>
    </ul>
    <h2>:information_source: How To Use </h2>
    <p>To clone and run this application, you'll need <a href="https://git-scm.com" rel="nofollow">Git</a>, <a href="https://nodejs.org/" rel="nofollow">Node.js</a> + <a href="https://legacy.yarnpkg.com" rel="nofollow">Yarn</a>. From your command line:</p>
    <div class="highlight highlight-source-shell">
      <pre><span class="pl-c"><span class="pl-c">#</span> Be into the repository</span> 
$ <span class="pl-c1">cd</span> bootcamp-gostack-old/nodejs <br/>
<span class="pl-c"><span class="pl-c">#</span> Install dependencies</span>
$ yarn <br/>
<span class="pl-c"><span class="pl-c">#</span> Run the development server</span>
$ yarn start <br/>
<span class="pl-c"><span class="pl-c">#</span> Navigate to http://localhost:3000</span>
<span class="pl-c"><span class="pl-c">#</span> The app will automatically reload if you change any of the source files.</span></pre>
</div>
    <br/>
    <p>To test this API, you'll need <a href="https://insomnia.rest/" rel="nofollow">Insomnia REST</a>, or similar. Then, create routes:</p>
    <ul>
      <li>
        <p><code>POST /projects</code>: Route that add new projects. The route must receive <code>title</code> inside the body request; Be sure to send the project title in string format with double quotes: <code>{ "title": "Projeto" }</code>;</p>
      </li>
      <li>
        <p><code>GET /projects</code>: Route that lists all projects and their tasks;</p>
      </li>
      <li>
        <p><code>GET /projects/:id</code>: Route that lists a project by id;</p>
      </li>
      <li>
        <p><code>PUT /projects/:id</code>: Route that update the project title by id. The route must receive <code>title</code> inside the body request; Be sure to send the project title in string format with double quotes: <code>{ "title": "Updated Project" }</code>;
      </li>
      <li>
        <p><code>DELETE /projects/:id</code>: Route that deletes the project by id;</p>
      </li>
      <li>
        <p><code>POST /projects/:id/tasks</code>: Route that add task to a project by id. The route must receive <code>task</code> inside the body request; Be sure to send the project task in string format with double quotes: <code>{ "task": "Task" }</code>;</p>
      </li>
    </ul>
    <hr>
    <p>Made with ♥ by Gisele Silva :wave: <a href="https://www.linkedin.com/in/gisabernardess/" rel="nofollow">Get in touch!</a></p>
  </article>
</div>
