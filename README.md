## Spanish translation for GenieACS GUI

***

## Introduction
This code is tested only on GenieACS v1.2.5 and v1.2.8

May be work in other v1.2.X versions but is not guaranteed. You can try it at your own risk.

The original author of 'app.js' code is [GenieACS Inc](https://github.com/genieacs/genieacs). This project is only a mod to translate the GUI language.

## Quick start
In order to translate GenieACS GUI, you need to do two steps. The first step is update every page layout from the bottom buttons inside admin page in GenieACS GUI

The second step is replace _'app.js'_ file in your GenieACS server. This step can be done using SSH or SCP

##### IMPORTANT: Replace _'genieacs_path'_ string in this guide according to your GenieACS installed version. The paths are:

> For GenieACS v1.2.5:

    /usr/lib/node_modules/genieacs/

> For GenieACS v1.2.8:

    /usr/local/lib/node_modules/genieacs/

### 1.  Update page layouts
The first step for translate GenieACS GUI is update every page layout. This can be done easily from 'Admin > Config' page on GenieACS GUI.

In the bottom of the 'Config' page, you can find several buttons such as 'overview', 'charts', 'filters', 'index page' and 'device page' etc...

> Every button contains a YAML code wich defines the aspect of it's own page.

In this repo, you can find inside 'v1.2.X/config' folders several files named same as the buttons. You need to replace the content of every button with it's correspondent file of your GenieACS version.

For example, if you want to translate index page, you need to copy the YAML code inside 'v1.2.X/config/index_page.yaml' to the 'index page' button.

***

### 2.  Replace _'app.js'_ file

### <u>SSH Method</u>

#### Connect to your GenieACS server
    ssh user@ip_of_genieacs_server

Before start, make sure that you have installed git package on your GenieACS server. If you don't have installed git package, you can install it with this commands:

For Debian/Ubuntu:

    sudo apt install -y git


For CentOS:

    sudo yum install -y git



#### Make a backup of _'app.js'_ file
    cp /genieacs_path/public/app.js /genieacs_path/public/app.js.bak

#### Clone this repo
    cd /tmp && git clone https://github.com/d4vidcn/genieacs_spanish_gui.git

#### Copy _'app.js'_ file to GenieACS GUI folder
> For GenieACS v1.2.5

    cp /tmp/genie_acs_spanish_gui/v1.2.5/app.js /genieacs_path/public/

> For GenieACS v1.2.8

    cp /tmp/genie_acs_spanish_gui/v1.2.8/app.js /genieacs_path/public/

### <u>SCP Method</u>
#### Download files from Github
Go to _'https://github.com/d4vidcn/genieacs_spanish_gui'_ and download _'app.js'_ from v1.2.X folder to your desktop

#### Connect to GenieACS server
Open your favourite SCP client such as WinSCP and connect to your GenieACS server using SCP protocol

#### Make a backup
Browse to remote folder _'/genieacs_path/public/'_ and make a backup of _'app.js'_ file

#### Upload the new file
Upload the new _'app.js'_ file downloaded from Github to _'/genieacs_path/public/'_

***

### Extras
If you want to replace the default logo by your own logo, you need to convert it to SVG format, rename it to _'logo.svg'_ and upload it to _'/genieacs_path/public/'_

If your logo is in PNG format, you can also replace it following this easy steps.

1.  Upload your PNG logo to _'/genieacs_path/public/'_ folder
2.  Open _'/genieacs_path/public/app.js'_ file
3.  Find _'logo.svg'_ string and replace it by the name of your logo, for example _'mylogo.png'_
4.  Save file

***

### Responsibilities
This code is offered without any kind of guarantees or obligations.

The author of this code is not responsible for any possible damage caused by the use of his code. You can use it at your own risk.

### License
This repository is released under the [GNU General Public License v3.0](https://raw.githubusercontent.com/d4vidcn/genieacs_spanish_gui/main/LICENSE)
