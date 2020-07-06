autowatch = 1;
inlets = 1;
outlets =2;
function process(dname) {
	var d = new Dict(dname);
	post("received dictionary " + dname + "\n");
	if(d.get('nose')) {
		outlet(0, d.get('nose').get('x'))
		outlet(1, d.get('nose').get('y'))
	} 
	if(d.get('angle')) {
		outlet(0, d.get('angle'))
	}


}