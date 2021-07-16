### Any Game Any Score - Front and Back End

Any Game Any Score (AGAS) is a full-stack React web app with a Java Spring Boot API back end (with MySQL DB) which lets you track and save custom games and custom player profiles for that game, all in one place!
Whether you're playing tennis or DnD, save your progress with AGAS!
It also includes frequently-used gaming utilities such as; dice rolls (with custom values and amounts), custom calculations (eg. for quickly auto-calculating spells and abilities), quick points/score/attribute manipulation, and saving and sharing game templates.

##### Google Cloud Platform Hosting
This project is meant to be hosted on GCP or other cloud platform, but this cannot be feasibly maintained for longer periods of time due to GCP Projects amounting costs over time.


###### Back End
Built with Java Spring Boot with secure endpoints using Okta Auth - uses entities and controllers to generate and interact with a MySQL DB using the JPA repository technology.
Also utilises custom JSON fields to provide flexibility with the user-created game and player profiles.


###### Front End
Built with React JS and employs Secure Routing via Okta and react-router-dom. 
