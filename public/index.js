Quasar.iconSet.set(Quasar.iconSet.mdiV5);

var base = new Vue({
	el: "#q-app",
	data: function () {
		return {
			value: 2,
			seed: "",
			withSeed: false,
			modal: false,
			modal_pw: "",
			modal_pwl: "",
			modal_pws: "",
		};
	},
	methods: {
		generate: () => {
			if (!base.withSeed) base.seed = "";
			$.post("/generate", { num: base.value, seed: base.seed }, (data) => {
				base.modal_pw = data.password;
				base.modal_pwl = data.length;
				base.modal_pws = data.seed;

				base.modal = true;
			});
		},
	},
});
