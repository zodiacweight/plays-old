function Human(name){
    this.name = name;
}

Human.prototype.setLastName = function(lastName){
    this.lastName = lastName;
};
Human.prototype.setLivingPlace = function (place) {
    this.livingPlace = place;
};

var Boy = new Human('Vasya'),
    Girl = new Human('Bea'),
    professor = new Human("Christopher");

Girl.setLastName('Kidney');
professor.setLastName("Clarkson");
Boy.setLivingPlace("Rostov on Don, Russia");
Girl.setLivingPlace("Salvador");/* */
professor.setLivingPlace("Cambridge, England");
console.log({ Boy: Boy, Girl: Girl, professor: professor});