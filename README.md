# Cheeky Learner
Cheeky Learner is a logbook generator web application built in javascript with Angular.js.
It allows the user to generate pseudorandom entries for a Victorian learner driver's logbook.


![Imgur](http://i.imgur.com/sS0mRt9.png "Example logpage")


Cheeky Learner was built for the purpose of learning JavaScript, the Angular.js framework and the process involved in developing web applicatons.
The current master branch of the applciation is hosted on an AWS server [here.](http://ec2-54-66-240-216.ap-southeast-2.compute.amazonaws.com/logGen "CheekyLearner Home Page")
There you can demo an an extremely early and unfinished version of the application.


#### How it works:
Cheeky Learner works in three parts. Firstly, it prompts the user for some basic details, as seen in the image below.

![Imgur](http://i.imgur.com/3JNC1zU.png "User prompt")

Next, these details are saved and passed along to the generator. The Pages Controller then requests a page(14 entries) to be generated. The generator uses the initial values to generate a new single line entry. This is then handed back off to the Pages Controller and this process repeats until 14 entries have been generated. Having entries be generated one at a time and sent to the Pages Controller stops obvious patterns from appearing by using a different seed each time.

Lastly, the Pages Controller formats these new entries into human readable form and adds them to the DOM where the user can then see them, styled in a fancy CSS table.

More pages by pressing the + button. Each new page builds upon the the data from previous pages and correctly tallies the total hours at the top of the page.

#### TODO:
  * Build a proper backend connected to a database
  * User accounts to allow users to pick up where they left off
  * More refined generation engine
  * Refactor the messy CSS



#### *Disclaimer:*

This application should in **_no way shape or form_** actually be used to spoof a learner's logbook. I take no responsibility if you decide to take that risk and it goes against the spirit in which this application was built. As the warning within the logbook itself states.
>Heavy penalties will apply for providing false or misleading entries.


:)
