autowatch = 1;
inlets = 1;
outlets =2;
function process(dname) {
	var d = new Dict(dname);
outlet(0, d.get('nose').get('x'))
outlet(1, d.get('nose').get('y'))
}