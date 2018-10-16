function getHTTPObject()
{
	if (window.ActiveXObject) 
	{
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest) 
	{
		return new XMLHttpRequest();
	}
	else 
	{
		alert("Your browser does not support AJAX.");
		return null;
	}
}

function openrecord(recordid, navpos, clearpath, rtl)
{
    if (rtl == null)
        rtl = 'N';

    document.body.style.cursor = 'wait';
    var lang = document.getElementById('selectedlang');
    var langid = document.getElementById('if_lang').value;
    var loading = document.getElementById('if_loading').value;
    document.getElementById('recordbox').innerHTML = '<div class=\"wait\">' + loading + '...</div>';
    httpObject = getHTTPObject();
    if (httpObject != null)
    {
        recordid = recordid.replace("\"", "%22");
        recordid = recordid.replace("+", "%2B");
        var passstring = "getrecord.php?id=" + recordid + "&lang=" + langid;
        if (navpos != -1)
        {
            passstring = passstring + "&navpos=" + navpos;
        }
        else if (clearpath == true)
        {
            passstring = passstring + "&clearpath=true";
        }
        passstring = passstring + "&rtl=" + rtl;

        //alert(passstring);

        httpObject.onreadystatechange = setRecord;
        httpObject.open("GET", passstring, true);
        httpObject.send(null)
    }
    else
    {
        alert("Failed to get classmark record")
    }
}

function expandbox(rtl)
{
    var rightleft = false;

    if (rtl != null)
    {
        rightleft = (rtl > 0);
    }

	//alert("expandbox = " + (rightleft ? 'RTL' : 'LTR'));
	
	var leftBox = document.getElementById('leftWidth');
	var leftDiv = document.getElementById('classmarkbox');
	var rightDiv = document.getElementById('recordbox');
	var expandBox = document.getElementById("expandbox");
	var openCloseMenu = document.getElementById("openclosemenu");
	
	var leftWidth = leftBox.value;
	//alert("LeftWidth = " + leftWidth);
	
	if (leftWidth != '420')
	{
		leftDiv.style.width = "420px";
		rightDiv.style.width = "520px";
        if (rightleft != true)
        {
    		expandBox.style.backgroundImage = 'url(../images/rightarrow.png)';
        }
        else
        {
            expandBox.style.backgroundImage = 'url(../images/leftarrow.png)';
        }
		openCloseMenu.style.width = "405px";
		leftBox.value = "420";
		
	}
	else
	{
		leftDiv.style.width = "720px";
		rightDiv.style.width = "220px";
        if (rightleft != true)
        {
            openCloseMenu.style.width = "705px";
    		expandBox.style.backgroundImage = 'url(../images/leftarrow.png)';
        }
        else
        {
            openCloseMenu.style.width = "720px";
            expandBox.style.backgroundImage = 'url(../images/rightarrow.png)';
        }

		leftBox.value = "720";
	}
}


function setRecord()
{
	setReplyText('recordbox');
    document.body.style.cursor='auto';
}

function setReplyText(elementID)
{
	if (httpObject.readyState == 4)
	{	
		var responseText = httpObject.responseText;
		document.getElementById(elementID).innerHTML = responseText;
	}
}

var httpObject = null;