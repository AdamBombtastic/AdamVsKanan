
var myItemList = document.getElementById("itemList");
function addNewProjectCard(projectTitle,paragraphText,progress,id) {
    var myCard = createListElement(id);
    myItemList.appendChild(myCard.getObject());

    myCard.setHeaderText(projectTitle);
    myCard.setProgress(progress);
    myCard.setDescText(paragraphText);
    myCard.getAdamBtn().onclick = () => {
        myCard.addVote("adam");
    }
    myCard.getKananBtn().onclick = () => {
        myCard.addVote("kanan");
    }

    mCardArray.push(myCard);
    
}
function createListElement(id) {
    incEntCount();
    if (id == null) {
        id = "ent"+ENTITY_COUNT;
    }
    var myEle = document.createElement("li");
    myEle.id = id;
    myEle.appendChild(createProjectCard(id));
    return new ProjectCard(myEle);
}
function createProjectCard(id) {
    var myEle = document.createElement("div");
    myEle.id = id+"_card";
    myEle.className="projectContainer"
    
    var contentContainer = document.createElement("div");

    var myHeader = document.createElement("h3");
    myHeader.innerText="Project Title";
    myHeader.id = id+"_header";

    var myDesc = document.createElement("p");
    myDesc.innerText="description";
    myDesc.id= id+"_desc";

    var myProgress = document.createElement("progress");
    myProgress.setAttribute("max","100");
    myProgress.setAttribute("value","50");
    myProgress.id = id+"_progress";

    var btnVoteAdam = document.createElement("div");
    btnVoteAdam.innerText="Vote Adam";
    btnVoteAdam.className="voteButton adamTheme";
    btnVoteAdam.id = id+"_adam_btn";

    var btnVoteKanan = document.createElement("div");
    btnVoteKanan.innerText="Vote Kanan";
    btnVoteKanan.className="voteButton kananTheme";
    btnVoteKanan.id=id+"_kanan_btn";

    contentContainer.appendChild(myHeader);
    contentContainer.appendChild(myDesc);
    contentContainer.appendChild(myProgress);
    contentContainer.appendChild(btnVoteAdam);
    contentContainer.appendChild(btnVoteKanan);


    contentContainer.className="cardContentWrapper";

    myEle.appendChild(contentContainer);
    return myEle;
}
function ProjectCard(myEle) {
    this._htmlObj = myEle;
    this.id = myEle.id;
    this.votes = {adam: 1 , kanan : 1};

    this.refresh = ()=>{
        this._headerObj = document.getElementById(this.id+"_header");
        this._descObj = document.getElementById(this.id+"_desc");
        this._progressObj = document.getElementById(this.id+"_progress");
        this._adamBtn = document.getElementById(this.id+"_adam_btn");
        this._kananBtn = document.getElementById(this.id+"_kanan_btn");
    }
    this.refresh();
    this.setProgress = (val)=>{
        if (this._progressObj == null) this.refresh();
        this._progressObj.setAttribute("value",val);
    }
    this.getProgress = () => {
        if (this._progressObj == null) this.refresh();
        this._progressObj.getAttribute("value");
    }
    this.setHeaderText = (val) =>{
        if (this._headerObj == null) this.refresh();
        this._headerObj.innerText = val;
    }
    this.getHeaderText = () => {
        if (this._headerObj == null) this.refresh();
        return this._headerObj.innerText;
    }
    this.setDescText = (val) => {
        if (this._descObj == null) this.refresh();
        this._descObj.innerText = val;
    }
    this.getAdamBtn = () => {
        if (this._adamBtn == null) this.refresh();
        return this._adamBtn;
    }
    this.getKananBtn = () => {
        if (this._kananBtn == null) this.refresh();
        return this._kananBtn;
    }
    
    this.calcProgress = ()=> {
        var total = this.votes["adam"] + this.votes["kanan"];
        var myProgress = (this.votes["adam"] / total) * 100;
        this.setProgress(myProgress);
    }
    
    this.addVote = (name) =>{
        this.votes[name] += 1;
        this.calcProgress();
    }

    this.getObject = () => this._htmlObj;
}
/* Entity Controllers */
var ENTITY_COUNT = 0;
function incEntCount() {ENTITY_COUNT+=1;}
var mCardArray = [];

window.onload(new function(ev) {
   addNewProjectCard("Markelle Fultz Statline","What will his stats be?",50);
});
