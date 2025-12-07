# DEVTRACKTA_APPLICATION

*Purpose of the App:*
This App was made to identify all kinds of plants only through pictures and save their names / kinds in the user's history.
**If you're wondering why did i come up with this random idea, this can be used for an electronics project im making to enhance performance (if it was developed more)

HOW TO USE: 
1. Start by Signing up, then if you want to visit the application again you can log in. (make sure to not use real email/passwords but remember them to be able to log in) *Note, currently the only option to log out is if you go back and try to log in again while you're still logged in.
3. you enter your home screen where you have multiple options, but you start by opening the camera (you can choose front or back), and taking a picture of any plant you want.
4. after taking a picture, you press "show plant" to see the three most accurate indetifications of that plan (and their scientific name).
5. lastly, you can see your history on page two, where you can see every plant you have ever searched up before.

Technologies used: 
1. expo / react native components and libraries -> I won't name all of the simple ones like <Text> etc. but i combined their usage to create simple dynamic reusable components like buttons and textboxes, used the common hooks of useState, useEffect, and useRef. I also used expo camera in the main feature.
3. Pl@ntNet plant identifier API , integrated through Axios.
4. Appwrite database -> authenticator, and one for plant history.
   about the plant history database, i got familiarized of dealing with costum databases after this project, but i didn't have time to implement full database structure on Appwrite , so i implemented it through JSON. (used it partially like a database, but stringified it and put it in appwrite)

Time of making the project: 
Since I had very few experience in react native from before (did a project a while ago, but i wasn't consistant, it took me some time to relearn and advance within it so im not counting the time of reviewing documentation. 
I would say that implementing the raw technologies (camera, api, databases) took me overall 3-4 hours, the problem and what took time is debugging (syntax and API calls) so it added a few hours to the time of the project . 

Future (very near) steps would be (that i didn't have time for):
1. working on frontend.
2. implementing full appwrite data structure, and adding other user actions like deleting and editing.







