{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 7,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 59.0, 104.0, 640.0, 480.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 674.0, 1067.0, 87.0, 22.0 ],
					"style" : "",
					"text" : "receive FMOut"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-101",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1244.0, 236.0, 182.0, 33.0 ],
					"style" : "",
					"text" : "MIDI KEYBOARD CONTROLLER"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"id" : "obj-99",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1208.0, 594.0, 183.0, 33.0 ],
					"style" : "",
					"text" : "MOBILE HANDSET INTERFACE",
					"textcolor" : [ 0.015686, 0.015686, 0.015686, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-93",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1199.0, 806.0, 103.0, 22.0 ],
					"style" : "",
					"text" : "scale 0. 1. 0 5000"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-92",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1199.0, 862.0, 113.0, 35.0 ],
					"style" : "",
					"text" : "pattrforward bp.Oscillator::Freq"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-91",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 304.0, 242.0, 314.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 304.0, 242.0, 0.0, 0.0 ],
					"varname" : "bp.Oscillator",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-82",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Stereo.maxpat",
					"numinlets" : 2,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 390.0, 1346.0, 148.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 390.0, 1346.0, 0.0, 0.0 ],
					"varname" : "bp.Stereo",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-80",
					"linecount" : 4,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1665.0, 476.0, 105.0, 62.0 ],
					"style" : "",
					"text" : "pattrforward \"bp.Stereo Mixer::live.slider[3]\""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-79",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1665.0, 377.0, 101.0, 22.0 ],
					"style" : "",
					"text" : "scale 0 127 -58 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"linecount" : 3,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1541.0, 476.0, 112.0, 49.0 ],
					"style" : "",
					"text" : "pattrforward \"bp.Stereo Mixer::live.slider[2]\""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-77",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1541.0, 377.0, 101.0, 22.0 ],
					"style" : "",
					"text" : "scale 0 127 -58 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-76",
					"linecount" : 4,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1409.0, 476.0, 110.0, 62.0 ],
					"style" : "",
					"text" : "pattrforward \"bp.Stereo Mixer::live.slider[1]\""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-75",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1409.0, 377.0, 101.0, 22.0 ],
					"style" : "",
					"text" : "scale 0 127 -58 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1268.0, 377.0, 101.0, 22.0 ],
					"style" : "",
					"text" : "scale 0 127 -58 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-73",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1268.0, 476.0, 135.0, 35.0 ],
					"style" : "",
					"text" : "pattrforward \"bp.Stereo Mixer::live.slider\""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-72",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 1665.0, 273.0, 47.0, 22.0 ],
					"style" : "",
					"text" : "ctlin 51"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-71",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 1541.0, 273.0, 47.0, 22.0 ],
					"style" : "",
					"text" : "ctlin 50"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 1409.0, 273.0, 47.0, 22.0 ],
					"style" : "",
					"text" : "ctlin 49"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 1268.0, 273.0, 47.0, 22.0 ],
					"style" : "",
					"text" : "ctlin 48"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-57",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Polyphonic Drone.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 32.0, 82.0, 438.0, 116.0 ],
					"varname" : "bp.Polyphonic Drone",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 1753.0, 862.0, 29.5, 22.0 ],
					"style" : "",
					"text" : "% 4"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "int", "", "", "int" ],
					"patching_rect" : [ 1753.0, 766.0, 61.0, 22.0 ],
					"style" : "",
					"text" : "counter"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1585.0, 795.0, 101.0, 22.0 ],
					"style" : "",
					"text" : "scale 0. 1. -36 36"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1585.0, 862.0, 125.5, 35.0 ],
					"style" : "",
					"text" : "pattrforward bp.Granular::Offset"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-46",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1585.0, 733.0, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"linecount" : 3,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1315.0, 912.0, 109.0, 49.0 ],
					"style" : "",
					"text" : "pattrforward bp.LFO[3]::Frequency"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-40",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO.maxpat",
					"numinlets" : 0,
					"numoutlets" : 5,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal" ],
					"patching_rect" : [ 888.0, 514.0, 137.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 888.0, 514.0, 0.0, 0.0 ],
					"varname" : "bp.LFO[3]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-39",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Ladder.maxpat",
					"numinlets" : 5,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 816.0, 663.0, 295.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 816.0, 663.0, 0.0, 0.0 ],
					"varname" : "bp.Ladder",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-35",
					"linecount" : 3,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1480.0, 842.0, 96.0, 49.0 ],
					"style" : "",
					"text" : "pattrforward bp.LFO[1]::Frequency"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1480.0, 795.0, 103.0, 22.0 ],
					"style" : "",
					"text" : "scale 0. 1. 0. 100."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-34",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1417.0, 1005.0, 193.0, 22.0 ],
					"style" : "",
					"text" : "pattrforward bp.LFO[2]::Frequency"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1417.0, 978.0, 103.0, 22.0 ],
					"style" : "",
					"text" : "scale 0. 1. 0. 100."
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-28",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO.maxpat",
					"numinlets" : 0,
					"numoutlets" : 5,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal" ],
					"patching_rect" : [ 258.0, 840.0, 137.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 258.0, 840.0, 0.0, 0.0 ],
					"varname" : "bp.LFO[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-27",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO.maxpat",
					"numinlets" : 0,
					"numoutlets" : 5,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal" ],
					"patching_rect" : [ 401.0, 840.0, 137.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 401.0, 840.0, 0.0, 0.0 ],
					"varname" : "bp.LFO[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-20",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.MIDI In.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "int" ],
					"patching_rect" : [ 560.0, -97.0, 133.0, 116.0 ],
					"varname" : "bp.MIDI In",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-19",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.MIDI to Signal.maxpat",
					"numinlets" : 1,
					"numoutlets" : 5,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal" ],
					"patching_rect" : [ 748.0, 34.0, 163.0, 116.0 ],
					"varname" : "bp.MIDI to Signal",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-32",
					"linecount" : 3,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1753.0, 960.0, 99.0, 49.0 ],
					"style" : "",
					"text" : "pattrforward bp.MMF::FilterType"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1837.0, 848.5, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1837.0, 920.5, 164.0, 22.0 ],
					"style" : "",
					"text" : "pattrforward bp.Samplr::Loop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1753.0, 723.0, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1333.0, 761.0, 94.0, 22.0 ],
					"style" : "",
					"text" : "scale 0. 1. -5. 5."
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-25",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1501.0, 719.0, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-24",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1417.0, 719.0, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-23",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1258.0, 719.0, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 7,
					"outlettype" : [ "", "", "", "", "", "", "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 7,
							"minor" : 0,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"rect" : [ 59.0, 104.0, 1037.0, 638.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-7",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 356.333374, 595.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-6",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 304.5, 595.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-5",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 588.0, 591.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-4",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 454.0, 591.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-3",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 171.0, 591.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-2",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 134.0, 591.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-1",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 97.0, 591.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-160",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 560.0, 73.339996, 36.0, 22.0 ],
									"style" : "",
									"text" : "6 $1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-173",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 454.0, 319.3367, 50.0, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 1164.0, 401.0, 50.0, 22.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-177",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 518.0, 455.670013, 96.0, 22.0 ],
									"style" : "",
									"text" : "disconnect 0 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-176",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 633.0, 455.670013, 66.0, 22.0 ],
									"style" : "",
									"text" : "patch 0 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-175",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "" ],
									"patching_rect" : [ 588.0, 397.670013, 64.0, 22.0 ],
									"style" : "",
									"text" : "route 0 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-174",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 518.0, 544.336639, 58.0, 22.0 ],
									"style" : "",
									"text" : "router 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-163",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 458.0, 73.339996, 38.0, 22.0 ],
									"style" : "",
									"text" : "5 $1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-162",
									"maxclass" : "newobj",
									"numinlets" : 6,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 426.0, 29.669982, 138.0, 22.0 ],
									"style" : "",
									"text" : "scale 1000 2000 0. 1."
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-161",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 365.670044, 73.339996, 38.0, 22.0 ],
									"style" : "",
									"text" : "3 $1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-75",
									"maxclass" : "newobj",
									"numinlets" : 6,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 294.0, 29.669982, 116.0, 22.0 ],
									"style" : "",
									"text" : "scale 0 1000 0. 1."
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-165",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 588.0, 348.670013, 50.0, 22.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-159",
									"maxclass" : "toggle",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 517.0, 152.670013, 24.0, 24.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-158",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 588.0, 275.670013, 63.0, 22.0 ],
									"style" : "",
									"text" : "unpack 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-157",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 588.0, 238.670013, 121.0, 22.0 ],
									"style" : "",
									"text" : "route /loopEvent"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-152",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"patching_rect" : [ 454.0, 275.670013, 63.0, 22.0 ],
									"style" : "",
									"text" : "unpack 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-151",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 454.0, 238.670013, 121.0, 22.0 ],
									"style" : "",
									"text" : "route /recordEvent"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-142",
									"maxclass" : "toggle",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 472.0, 152.670013, 24.0, 24.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-109",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 431.333374, 115.670013, 50.0, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 1224.0, 472.0, 50.0, 22.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-87",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 371.333374, 115.670013, 50.0, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 1167.0, 472.0, 50.0, 22.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-80",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "int", "int", "int" ],
									"patching_rect" : [ 324.0, 275.670013, 85.0, 22.0 ],
									"style" : "",
									"text" : "unpack 1 1 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-72",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 324.0, 238.670013, 117.0, 22.0 ],
									"style" : "",
									"text" : "route /touchEvent"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-70",
									"maxclass" : "newobj",
									"numinlets" : 6,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 352.333374, 447.336639, 104.0, 22.0 ],
									"style" : "",
									"text" : "scale -9. 9. 0. 1."
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-137",
									"maxclass" : "newobj",
									"numinlets" : 6,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 225.5, 447.336639, 109.0, 22.0 ],
									"style" : "",
									"text" : "scale -9. 9. -1. 1."
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-136",
									"maxclass" : "newobj",
									"numinlets" : 6,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 97.0, 447.336639, 104.0, 22.0 ],
									"style" : "",
									"text" : "scale -9. 9. 1. 0."
								}

							}
, 							{
								"box" : 								{
									"format" : 6,
									"id" : "obj-132",
									"maxclass" : "flonum",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 260.333374, 335.3367, 50.0, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 1052.333374, 472.0, 50.0, 22.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"format" : 6,
									"id" : "obj-131",
									"maxclass" : "flonum",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 193.0, 335.3367, 50.0, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 982.333313, 472.0, 50.0, 22.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"format" : 6,
									"id" : "obj-117",
									"maxclass" : "flonum",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 127.0, 335.3367, 50.0, 22.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 912.0, 472.0, 50.0, 22.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-115",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "float", "float", "float" ],
									"patching_rect" : [ 127.0, 289.3367, 96.0, 22.0 ],
									"style" : "",
									"text" : "unpack 1. 1. 1."
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-110",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 117.0, 238.670013, 134.0, 22.0 ],
									"style" : "",
									"text" : "route /wek/inputs"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-74",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 215.0, 153.670013, 109.0, 22.0 ],
									"style" : "",
									"text" : "udpreceive 6448"
								}

							}
, 							{
								"box" : 								{
									"angle" : 270.0,
									"grad1" : [ 0.960784, 0.827451, 0.156863, 1.0 ],
									"grad2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
									"id" : "obj-169",
									"maxclass" : "panel",
									"mode" : 1,
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 97.0, 15.0, 630.666748, 574.003357 ],
									"proportion" : 0.39,
									"style" : ""
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-162", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-109", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-115", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-110", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-117", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-115", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-131", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-115", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-132", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-115", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-136", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-117", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-137", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-131", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-70", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-132", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-136", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-174", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-136", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-2", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-137", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-152", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-151", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-142", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-152", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-173", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-152", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-158", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-157", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-159", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-158", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-165", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-158", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-163", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-162", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-162", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-175", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-165", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-5", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-165", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-4", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-173", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-176", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-175", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-177", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-175", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-174", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-176", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-174", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-177", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-70", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-80", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-72", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-110", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-74", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-151", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-74", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-157", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-74", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-72", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-74", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-160", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-75", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-161", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-75", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-75", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-109", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-80", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-87", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-80", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-75", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-87", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 1258.0, 666.0, 598.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"style" : "",
						"tags" : ""
					}
,
					"style" : "",
					"text" : "p mobilecontroller"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 7,
							"minor" : 0,
							"revision" : 0,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"rect" : [ 232.0, 217.0, 640.0, 480.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"boxes" : [ 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-2",
									"maxclass" : "inlet",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "signal" ],
									"patching_rect" : [ 48.0, 34.5, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"comment" : "",
									"id" : "obj-1",
									"maxclass" : "outlet",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 119.583252, 397.0, 30.0, 30.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-150",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 547.999878, 210.999985, 35.0, 22.0 ],
									"style" : "",
									"text" : "plug"
								}

							}
, 							{
								"box" : 								{
									"bgmode" : 0,
									"border" : 0,
									"clickthrough" : 0,
									"id" : "obj-153",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 8,
									"offset" : [ 0.0, 0.0 ],
									"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
									"patching_rect" : [ 490.249878, 256.0, 168.5, 22.0 ],
									"save" : [ "#N", "vst~", "loaduniqueid", 0, ";" ],
									"saved_attribute_attributes" : 									{
										"valueof" : 										{
											"parameter_invisible" : 1,
											"parameter_longname" : "vst~",
											"parameter_shortname" : "vst~",
											"parameter_type" : 3
										}

									}
,
									"saved_object_attributes" : 									{
										"annotation_name" : "",
										"parameter_enable" : 1
									}
,
									"snapshot" : 									{
										"filetype" : "C74Snapshot",
										"version" : 1,
										"name" : "GuitarGadgets.vst",
										"origin" : "GuitarGadgets.vst",
										"type" : "VST",
										"subtype" : "MidiEffect",
										"snapshot" : 										{
											"pluginname" : "GuitarGadgets.vst",
											"plugindisplayname" : "Guitar Gadgets",
											"pluginsavedname" : "~/Library/Audio/Plug-Ins/VST/GuitarGadgets.vst",
											"pluginsaveduniqueid" : 0,
											"version" : 1,
											"isbank" : 0,
											"isbase64" : 1,
											"blob" : "1261.CMlaKA....fQPMDZ....AbzQAQD..H.V....APVYlEVcrQG..............................PPrVMjLgfJA...OMUGazkVQlYVYiQGHNUWaPElbg0VYzUlby0iHz.iHfjjSPUEUvziHvHBHOUEUPUEUvziHv3xL3.CLv.SLwPCMz.SNwbSN1fyM0HBHI4DQXEDSG8DL8HRNh.BTR0TLvziHv3hLv.CLv.CLvHSN3.iLyHiLyfyM2HBHPIUSx.SOh.iKxLCLv.CLvbCN1bCNwLSLw.yL0HiHf.kTMMCL8HBLtLCMv.CLv.yLyLyM3XCLw.yMzHiLh.BTR0DMvziHv3BN4jSN4jSN2XSL0fSLzHCL3jCNzHBHI4DQXMzSMIDL8HBLh.BROQEL8HBLh.RQNEjPLUDQvziHwHBHI4DTUQUL8HBLh.xSUQETUQUL8HBLtTiHfjjSDgUPLczSwziHvHBHPIUSwDSOh.iK0HBHPIUSxDSOh.iK0HBHPIUSyDSOh.iK0HBHPIUSzDSOh.iK0HBHI4DQXMzSMITL8HBLh.BROQUL8HBLh.RQNEjPLUDQwziHvHBHI4DTUQkL8HBLh.xSUQETUQkL8HBLtTiHfjjSDgUPLczSxziHvHBHPIUSwHSOh.iK0HBHPIUSxHSOh.iK0HBHPIUSyHSOh.iK0HBHPIUSzHSOh.iK0HBHI4DQXMzSMIjL8HBLh.BROQkL8HBLh.RQNEjPLUDQxziHvHBHI4DTUQ0L8HBLh.xSUQETUQ0L8HBLtTiHfjjSDgUPLczSyziHvHBHPIUSwLSOh.iK0HBHPIUSxLSOh.iK0HBHPIUSyLSOh.iK0HBHPIUSzLSOh.iK0HBHI4DQXMzSMIzL8HBLh.BROQ0L8HBLh.RQNEjPLUDQyziHvHBHI4DTUQELCMTOhzRLh.xSUQETUQELCMTOhzRLh.RRNQDVAwzQOAyPC0iHsDiHf.kTMECLCMTOhzRLh.BTR0jLvLzP8HRKwHBHPIUSy.yPC0iHsDiHf.kTMQCLCMTOhzRLh.RRNQDVC8TSBAyPC0iHsDiHffzSTAyPC0iHsDiHfTjSAIDSEQDLCMTOhzRLh.RRNAUUTEyPC0iHsDiHf7TUTAUUTEyPC0iHsDiHfjjSDgUPLczSwLzP8HRKwHBHPIUSwDyPC0iHsDiHf.kTMISLCMTOhzRLh.BTR0zLwLzP8HRKwHBHPIUSzDyPC0iHsDiHfjjSDg0PO0jPwLzP8HRKwHBHH8DUwLzP8HRKwHBHE4TPBwTQDEyPC0iHsDiHfjjSPUEUxLzP8HRKwHBHOUEUPUEUxLzP8HRKwHBHI4DQXEDSG8jLCMTOhzRLh.BTR0TLxLzP8HRKwHBHPIUSxHyPC0iHsDiHf.kTMMiLCMTOhzRLh.BTR0DMxLzP8HRKwHBHI4DQXMzSMIjLCMTOhzRLh.BROQkLCMTOhzRLh.RQNEjPLUDQxLzP8HRKwHBHI4DTUQ0LCMTOhzRLh.xSUQETUQ0LCMTOhzRLh.RRNQDVAwzQOMyPC0iHsDiHf.kTMEyLCMTOhzRLh.BTR0jLyLzP8HRKwHBHPIUSyLyPC0iHsDiHf.kTMQyLCMTOhzRLh.RRNQDVC8TSBMyPC0iHsDiHffzSTMyPC0iHsDiHfTjSAIDSEQzLCMTOhzRLh7hO..@"
										}

									}
,
									"style" : "",
									"text" : "vst~",
									"varname" : "vst~",
									"viewvisibility" : 0
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-145",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 361.333252, 211.0, 35.0, 22.0 ],
									"style" : "",
									"text" : "plug"
								}

							}
, 							{
								"box" : 								{
									"bgmode" : 0,
									"border" : 0,
									"clickthrough" : 0,
									"id" : "obj-149",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 8,
									"offset" : [ 0.0, 0.0 ],
									"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
									"patching_rect" : [ 303.583252, 256.0, 168.5, 22.0 ],
									"save" : [ "#N", "vst~", "loaduniqueid", 0, ";" ],
									"saved_attribute_attributes" : 									{
										"valueof" : 										{
											"parameter_invisible" : 1,
											"parameter_longname" : "vst~[1]",
											"parameter_shortname" : "vst~[1]",
											"parameter_type" : 3
										}

									}
,
									"saved_object_attributes" : 									{
										"annotation_name" : "",
										"parameter_enable" : 1
									}
,
									"snapshot" : 									{
										"filetype" : "C74Snapshot",
										"version" : 1,
										"name" : "GuitarGadgets.vst",
										"origin" : "GuitarGadgets.vst",
										"type" : "VST",
										"subtype" : "MidiEffect",
										"snapshot" : 										{
											"pluginname" : "GuitarGadgets.vst",
											"plugindisplayname" : "Guitar Gadgets",
											"pluginsavedname" : "~/Library/Audio/Plug-Ins/VST/GuitarGadgets.vst",
											"pluginsaveduniqueid" : 0,
											"version" : 1,
											"isbank" : 0,
											"isbase64" : 1,
											"blob" : "1226.CMlaKA....fQPMDZ....AbzQAQD..H.V....APVYlEVcrQG..............................PfiVMjLgTHA...OMUGazkVQlYVYiQGHNUWaPElbg0VYzUlby0iHz.iHfjjSPUEUvziHvHBHOUEUPUEUvziHv3RMh.RRNQDVAwzQOASOhfiHf.kTMECL8HBLtTiHf.kTMICL8HBLtPyM1jSN4jSN3.SNxXSMwLiM2DSNh.BTR0zLvziHv3hM3jSN4jSN4biMwTCNwPiLvfSN3HBHPIUSz.SOhDiKwHSLvLCN2bSLzTSN3TyL1TiM2TVKzPiHfjjSDg0PO0jPvziHvHBHH8DUvziHvHBHE4TPBwTQDASOhDiHfjjSPUEUwziHvHBHOUEUPUEUwziHv3RMh.RRNQDVAwzQOESOh.iHf.kTMESL8HBLtTiHf.kTMISL8HBLtTiHf.kTMMSL8HBLtTiHf.kTMQSL8HBLtTiHfjjSDg0PO0jPwziHvHBHH8DUwziHvHBHE4TPBwTQDESOh.iHfjjSPUEUxziHvHBHOUEUPUEUxziHv3RMh.RRNQDVAwzQOISOh.iHf.kTMEiL8HBLtTiHf.kTMIiL8HBLtTiHf.kTMMiL8HBLtTiHf.kTMQiL8HBLtTiHfjjSDg0PO0jPxziHvHBHH8DUxziHvHBHE4TPBwTQDISOh.iHfjjSPUEUyziHvHBHOUEUPUEUyziHv3RMh.RRNQDVAwzQOMSOh.iHf.kTMEyL8HBLtTiHf.kTMIyL8HBLtTiHf.kTMMyL8HBLtTiHf.kTMQyL8HBLtTiHfjjSDg0PO0jPyziHvHBHH8DUyziHvHBHE4TPBwTQDMSOh.iHfjjSPUEUvLzP8HRKwHBHOUEUPUEUvLzP8HRKwHBHI4DQXEDSG8DLCMTOhzRLh.BTR0TLvLzP8HRKwHBHPIUSx.yPC0iHsDiHf.kTMMCLCMTOhzRLh.BTR0DMvLzP8HRKwHBHI4DQXMzSMIDLCMTOhzRLh.BROQELCMTOhzRLh.RQNEjPLUDQvLzP8HRKwHBHI4DTUQULCMTOhzRLh.xSUQETUQULCMTOhzRLh.RRNQDVAwzQOEyPC0iHsDiHf.kTMESLCMTOhzRLh.BTR0jLwLzP8HRKwHBHPIUSyDyPC0iHsDiHf.kTMQSLCMTOhzRLh.RRNQDVC8TSBEyPC0iHsDiHffzSTEyPC0iHsDiHfTjSAIDSEQTLCMTOhzRLh.RRNAUUTIyPC0iHsDiHf7TUTAUUTIyPC0iHsDiHfjjSDgUPLczSxLzP8HRKwHBHPIUSwHyPC0iHsDiHf.kTMIiLCMTOhzRLh.BTR0zLxLzP8HRKwHBHPIUSzHyPC0iHsDiHfjjSDg0PO0jPxLzP8HRKwHBHH8DUxLzP8HRKwHBHE4TPBwTQDIyPC0iHsDiHfjjSPUEUyLzP8HRKwHBHOUEUPUEUyLzP8HRKwHBHI4DQXEDSG8zLCMTOhzRLh.BTR0TLyLzP8HRKwHBHPIUSxLyPC0iHsDiHf.kTMMyLCMTOhzRLh.BTR0DMyLzP8HRKwHBHI4DQXMzSMIzLCMTOhzRLh.BROQ0LCMTOhzRLh.RQNEjPLUDQyLzP8HRKwHxK9..HsDiHffzSTMyPC0iHsDiHfTjSAIDSEQzLCMTOhzRLh7hO..@"
										}

									}
,
									"style" : "",
									"text" : "vst~",
									"varname" : "vst~[1]",
									"viewvisibility" : 0
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-155",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 177.333252, 211.0, 35.0, 22.0 ],
									"style" : "",
									"text" : "plug"
								}

							}
, 							{
								"box" : 								{
									"bgmode" : 0,
									"border" : 0,
									"clickthrough" : 0,
									"id" : "obj-154",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 8,
									"offset" : [ 0.0, 0.0 ],
									"outlettype" : [ "signal", "signal", "", "list", "int", "", "", "" ],
									"patching_rect" : [ 119.583252, 256.0, 168.5, 22.0 ],
									"save" : [ "#N", "vst~", "loaduniqueid", 0, ";" ],
									"saved_attribute_attributes" : 									{
										"valueof" : 										{
											"parameter_invisible" : 1,
											"parameter_longname" : "vst~[2]",
											"parameter_shortname" : "vst~[2]",
											"parameter_type" : 3
										}

									}
,
									"saved_object_attributes" : 									{
										"annotation_name" : "",
										"parameter_enable" : 1
									}
,
									"snapshot" : 									{
										"filetype" : "C74Snapshot",
										"version" : 1,
										"name" : "ValhallaFreqEcho.vst",
										"origin" : "ValhallaFreqEcho.vst",
										"type" : "VST",
										"subtype" : "AudioEffect",
										"snapshot" : 										{
											"pluginname" : "ValhallaFreqEcho.vst",
											"plugindisplayname" : "ValhallaFreqEcho",
											"pluginsavedname" : "/Library/Audio/Plug-Ins/VST/ValhallaFreqEcho.vst",
											"pluginsaveduniqueid" : 0,
											"version" : 1,
											"isbank" : 0,
											"isbase64" : 1,
											"blob" : "350.CMlaKA....fQPMDZ....AXTbEgF.A.PA.............................................DfHVMjLgjQ....OMkETLU0QI4zTEQEUI4zQSABbrU2Yo4lUkI2bo8la8HRLh.xckQGQxkWSogWOh.iK0biLv.CLvHiM2.iL3fCL3TSNyfiHfLGZoYFc8HBLtbiLyjSN4jyM2DSLwfSL1PCL1HSMh.BYkwVX40iHv3BN2.CLv.CLvPyM1fyL2DSM3HCLyHBHykmai0iHvHBHlUVYjIVXisVOh.iK2LiL4jSN4fCLzPSN1biM0DyL1biHfv1a2MTcz0iHv3hM4jSN4jSN3fCL2jCL2DCLzPSNxHBHnk1YnMTcz0iHv3hMzbCLv.CLwPyM3DSN0DSNvPyLh.xbzUlbk8VOhDiHfTWZWkFYzgVOhTyLvHBH0kFRkk1YnQWOhHiMvHxK9.."
										}

									}
,
									"style" : "",
									"text" : "vst~",
									"varname" : "vst~[2]",
									"viewvisibility" : 0
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-140",
									"maxclass" : "meter~",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "float" ],
									"patching_rect" : [ 272.666626, 34.5, 80.0, 13.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 958.0, 382.5, 80.0, 13.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-141",
									"maxclass" : "meter~",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "float" ],
									"patching_rect" : [ 272.666626, 11.0, 80.0, 13.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 958.0, 362.333344, 80.0, 13.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-146",
									"maxclass" : "ezadc~",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "signal", "signal" ],
									"patching_rect" : [ 144.166626, 0.0, 45.0, 45.0 ],
									"presentation" : 1,
									"presentation_rect" : [ 897.0, 353.0, 45.0, 45.0 ],
									"style" : ""
								}

							}
, 							{
								"box" : 								{
									"angle" : 270.0,
									"grad1" : [ 0.870588, 0.415686, 0.062745, 1.0 ],
									"grad2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
									"id" : "obj-170",
									"maxclass" : "panel",
									"mode" : 1,
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 0.0, 172.0, 732.000061, 194.666672 ],
									"proportion" : 0.39,
									"style" : ""
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-149", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-145", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-140", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-146", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-141", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-146", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-149", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-149", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-153", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-150", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-153", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-153", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-154", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-154", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-154", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-155", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-149", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-149", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-153", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-153", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-154", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-154", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 32.0, 713.0, 113.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"style" : "",
						"tags" : ""
					}
,
					"style" : "",
					"text" : "p vstmic"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"linecount" : 3,
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1333.0, 835.0, 98.0, 49.0 ],
					"style" : "",
					"text" : "pattrforward bp.Granular::Position"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1258.0, 633.0, 73.0, 22.0 ],
					"saved_object_attributes" : 					{
						"client_rect" : [ 620, 170, 1098, 762 ],
						"parameter_enable" : 0,
						"storage_rect" : [ 583, 69, 1034, 197 ]
					}
,
					"style" : "",
					"text" : "pattrstorage",
					"varname" : "u103002121"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-11",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.MMF.maxpat",
					"numinlets" : 5,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 230.0, 973.0, 427.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 230.0, 973.0, 0.0, 0.0 ],
					"varname" : "bp.MMF",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-10",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Stereo Mixer.maxpat",
					"numinlets" : 8,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 363.0, 1167.0, 202.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 363.0, 1167.0, 0.0, 0.0 ],
					"varname" : "bp.Stereo Mixer",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-9",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Granular.maxpat",
					"numinlets" : 3,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 230.0, 617.0, 541.0, 214.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 23.0, 260.0, 541.0, 214.0 ],
					"varname" : "bp.Granular",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-15",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO.maxpat",
					"numinlets" : 0,
					"numoutlets" : 5,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal" ],
					"patching_rect" : [ 75.0, 242.0, 137.0, 116.0 ],
					"varname" : "bp.LFO",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-14",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Spectral Filter.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 32.0, 409.0, 363.0, 116.0 ],
					"varname" : "bp.Spectral Filter",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-13",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Global Transport.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 600.0, 1205.0, 111.0, 116.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 600.0, 1205.0, 0.0, 0.0 ],
					"varname" : "bp.Global Transport",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-8",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Samplr.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 816.0, 273.0, 366.0, 214.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 816.0, 273.0, 0.0, 0.0 ],
					"varname" : "bp.Samplr",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-6",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.ASR.maxpat",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 416.0, 409.0, 142.0, 116.0 ],
					"varname" : "bp.ASR",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-5",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 32.0, 561.0, 113.0, 116.0 ],
					"varname" : "bp.VCA",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-94",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ -43.0, -136.0, 1237.0, 1614.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"grad1" : [ 0.717647, 0.494118, 0.192157, 1.0 ],
					"grad2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"id" : "obj-95",
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1193.5, 585.0, 820.0, 526.0 ],
					"proportion" : 0.5,
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"angle" : 270.0,
					"grad1" : [ 0.611765, 0.682353, 0.058824, 1.0 ],
					"grad2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"id" : "obj-100",
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1235.0, 229.0, 579.0, 349.0 ],
					"proportion" : 0.5,
					"style" : ""
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-10", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-82", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 3 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 239.5, 1100.5, 450.928571, 1100.5 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 239.5, 1126.5, 424.785714, 1126.5 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 7 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 6 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-91", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 173.0, 368.0, 272.75, 368.0, 272.75, 231.0, 372.5, 231.0 ],
					"source" : [ "obj-15", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 793.5, 394.5, 425.5, 394.5 ],
					"source" : [ "obj-19", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-91", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 757.5, 231.0, 538.0, 231.0, 538.0, 231.0, 313.5, 231.0 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 569.5, 26.0, 757.5, 26.0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 41.5, 1142.5, 398.642857, 1142.5 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 41.5, 1150.5, 372.5, 1150.5 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-22", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-22", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-29", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-22", 5 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-22", 6 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-22", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-93", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 410.5, 966.0, 191.0, 966.0, 191.0, 606.0, 500.5, 606.0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-28", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 5 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 825.5, 1141.0, 503.214286, 1141.0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 825.5, 1120.0, 477.071429, 1120.0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-40", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-75", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-77", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-79", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-76", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-75", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-78", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-77", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-80", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-79", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-9", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-91", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-92", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-93", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-39::obj-55" : [ "power", "power", 0 ],
			"obj-9::obj-101" : [ "Width", "Width", 0 ],
			"obj-39::obj-20" : [ "Freq[1]", "Freq", 0 ],
			"obj-39::obj-23" : [ "CV2[1]", "CV2", 0 ],
			"obj-15::obj-12" : [ "Mute[7]", "Mute", 0 ],
			"obj-9::obj-19" : [ "CV2[3]", "CV2", 0 ],
			"obj-91::obj-45" : [ "FreqMode", "FreqMode", 0 ],
			"obj-8::obj-69::obj-2" : [ "pastebang[2]", "pastebang", 0 ],
			"obj-8::obj-61" : [ "Loop", "Loop", 0 ],
			"obj-91::obj-46" : [ "Offset", "Offset", 0 ],
			"obj-91::obj-11" : [ "PWM", "PWM", 0 ],
			"obj-19::obj-28" : [ "Bend", "Bend", 0 ],
			"obj-10::obj-37" : [ "Mute[5]", "Mute", 0 ],
			"obj-9::obj-45" : [ "DurationRandomAmt", "Random", 0 ],
			"obj-39::obj-63" : [ "CV3[1]", "CV3", 0 ],
			"obj-8::obj-49" : [ "RecordGate", "RecordGate", 0 ],
			"obj-82::obj-55" : [ "DSP", "DSP", 0 ],
			"obj-9::obj-3" : [ "Position", "Position", 0 ],
			"obj-20::obj-12::obj-2" : [ "pastebang", "pastebang", 0 ],
			"obj-10::obj-36" : [ "in3", "in3", 0 ],
			"obj-9::obj-25" : [ "CV", "CV", 0 ],
			"obj-9::obj-12" : [ "Mute[6]", "Mute", 0 ],
			"obj-21::obj-154" : [ "vst~[2]", "vst~[2]", 0 ],
			"obj-27::obj-12" : [ "Mute[4]", "Mute", 0 ],
			"obj-6::obj-6" : [ "Sustain", "Sustain", 0 ],
			"obj-13::obj-76" : [ "Transport", "Transport", 0 ],
			"obj-91::obj-106" : [ "CV3", "CV3", 0 ],
			"obj-19::obj-69" : [ "1voctled", "1voctled", 0 ],
			"obj-11::obj-95" : [ "ResCV[1]", "CV", 0 ],
			"obj-11::obj-23" : [ "Offset[2]", "Offset", 0 ],
			"obj-82::obj-22" : [ "Mute[1]", "Mute", 0 ],
			"obj-8::obj-152" : [ "LoopEnd", "LoopEnd", 0 ],
			"obj-82::obj-52" : [ "Level", "Level", 0 ],
			"obj-21::obj-149" : [ "vst~[1]", "vst~[1]", 0 ],
			"obj-11::obj-55" : [ "power[1]", "power", 0 ],
			"obj-9::obj-58" : [ "PanRandomAmt", "Random", 0 ],
			"obj-27::obj-20" : [ "Frequency[2]", "Freq", 0 ],
			"obj-8::obj-57" : [ "Select all", "Select all", 0 ],
			"obj-11::obj-11" : [ "Res[1]", "Res", 0 ],
			"obj-9::obj-71" : [ "Pan", "Pan", 0 ],
			"obj-6::obj-45" : [ "Attack", "Attack", 0 ],
			"obj-9::obj-28" : [ "Offset[3]", "Offset", 0 ],
			"obj-13::obj-129" : [ "Tempo", "Tempo", 0 ],
			"obj-10::obj-30" : [ "in4", "in4", 0 ],
			"obj-91::obj-107" : [ "Linear", "Linear", 0 ],
			"obj-9::obj-98::obj-2" : [ "pastebang[1]", "pastebang", 0 ],
			"obj-14::obj-8" : [ "dict", "dict", -1 ],
			"obj-14::obj-63::obj-8" : [ "StealthInit", "StealthInit", 0 ],
			"obj-91::obj-4" : [ "Waveform", "Waveform", 0 ],
			"obj-39::obj-54" : [ "CV1", "CV1", 0 ],
			"obj-28::obj-12" : [ "Mute[3]", "Mute", 0 ],
			"obj-19::obj-20" : [ "ModWheelActivityLED", "ModWheelActivityLED", 0 ],
			"obj-8::obj-19" : [ "import", "import", 0 ],
			"obj-6::obj-20" : [ "mute", "mute", 0 ],
			"obj-39::obj-4" : [ "Offset[1]", "Offset", 0 ],
			"obj-11::obj-54" : [ "CV1[1]", "CV1", 0 ],
			"obj-9::obj-114" : [ "MaxGrains", "MaxGrains", 0 ],
			"obj-14::obj-80" : [ "EditMode", "EditMode", 0 ],
			"obj-20::obj-1" : [ "refresh", "refresh", 0 ],
			"obj-8::obj-63" : [ "Root", "Root", 0 ],
			"obj-82::obj-56" : [ "OutputChannel", "OutputChannel", 0 ],
			"obj-8::obj-20" : [ "power[2]", "power", 0 ],
			"obj-11::obj-20" : [ "Freq[2]", "Freq", 0 ],
			"obj-11::obj-38" : [ "FilterType", "FilterType", 0 ],
			"obj-11::obj-51" : [ "CV2[2]", "CV2", 0 ],
			"obj-5::obj-80" : [ "Response[1]", "Response", 0 ],
			"obj-8::obj-8" : [ "write", "write", 0 ],
			"obj-10::obj-8" : [ "in1", "in1", 0 ],
			"obj-91::obj-51" : [ "Freq", "Freq", 0 ],
			"obj-11::obj-22" : [ "TimeMode[1]", "TimeMode", 1 ],
			"obj-91::obj-36" : [ "PW", "PW", 0 ],
			"obj-21::obj-153" : [ "vst~", "vst~", 0 ],
			"obj-9::obj-47" : [ "Duration", "Duration", 0 ],
			"obj-11::obj-63" : [ "CV3[2]", "CV3", 0 ],
			"obj-8::obj-151" : [ "LoopStart", "LoopStart", 0 ],
			"obj-20::obj-9" : [ "MIDI_out_LED", "MIDI_out_LED", 0 ],
			"obj-9::obj-94" : [ "PitchRandomAmt", "Random", 0 ],
			"obj-28::obj-20" : [ "Frequency[1]", "Freq", 0 ],
			"obj-8::obj-32" : [ "getsamplelength", "getsamplelength", 0 ],
			"obj-14::obj-7" : [ "bypass", "bypass", 0 ],
			"obj-6::obj-32" : [ "Release", "Release", 0 ],
			"obj-91::obj-129" : [ "CV2", "CV2", 0 ],
			"obj-91::obj-53" : [ "Mute", "Mute", 0 ],
			"obj-5::obj-33" : [ "Quadrants", "Quadrants", 0 ],
			"obj-5::obj-55" : [ "Bypass", "Bypass", 0 ],
			"obj-40::obj-20" : [ "Frequency", "Freq", 0 ],
			"obj-10::obj-23" : [ "in2", "in2", 0 ],
			"obj-40::obj-12" : [ "Mute[2]", "Mute", 0 ],
			"obj-39::obj-22" : [ "TimeMode", "TimeMode", 1 ],
			"obj-39::obj-28" : [ "Res", "Res", 0 ],
			"obj-39::obj-95" : [ "ResCV", "CV", 0 ],
			"obj-9::obj-115" : [ "NewGrainEvery", "NewGrainEvery", 0 ],
			"obj-14::obj-2" : [ "Response", "Response", 0 ],
			"obj-15::obj-20" : [ "Frequency[3]", "Freq", 0 ],
			"obj-8::obj-129" : [ "SampleStart", "SampleStart", 0 ]
		}
,
		"dependency_cache" : [ 			{
				"name" : "bp.VCA.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Level",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Level",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.ASR.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Envelope",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Envelope",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Samplr.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Oscillator",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Oscillator",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "pastebang.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Global Transport.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Sequencer",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Sequencer",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Spectral Filter.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Filter",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Filter",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.fp_fft.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.LFO.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/LFO",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/LFO",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Granular.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Oscillator",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Oscillator",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.rgrain.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "rchoosef.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "rchoose.maxpat",
				"bootpath" : "/Users/Shared/Max 7/Examples/sampling/granular/lib",
				"patcherrelativepath" : "../../../Shared/Max 7/Examples/sampling/granular/lib",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "transratio.maxpat",
				"bootpath" : "/Users/Shared/Max 7/Examples/max-tricks/notes-and-pitch/pitch-to-freq-ratio",
				"patcherrelativepath" : "../../../Shared/Max 7/Examples/max-tricks/notes-and-pitch/pitch-to-freq-ratio",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Stereo Mixer.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Mixers",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Mixers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.MMF.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Filter",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Filter",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.MIDI to Signal.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/MIDI",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/MIDI",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.MIDI In.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/MIDI",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/MIDI",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Ladder.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Filter",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Filter",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Stereo.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Output",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Output",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Oscillator.maxpat",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Oscillator",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/packages/Beap/clippings/BEAP/Oscillator",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "sine.svg",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "updown.svg",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "up.svg",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "square.svg",
				"bootpath" : "/private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"patcherrelativepath" : "../../../../private/var/folders/pn/k5yznsyd2hj8n0g681kd9zy80000gn/T/AppTranslocation/5ED48145-9E07-423A-9EC9-0F6F775428A6/d/Max.app/Contents/Resources/C74/media/max/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
 ],
		"embedsnapshot" : 0
	}

}
