export default {
  computed: {
    transportationStyle() {
      const style = {
        tramvaie: "deep-purple",
        autobuze: "cyan",
        microbuze: "orange",
        troleibuze: "pink"
      };
      return style[this.transportationType];
    },
    transportationIcon() {
      const icon = {
        tramvaie: "tram",
        autobuze: "directions_bus",
        microbuze: "local_shipping",
        troleibuze: "directions_transit"
      };
      return icon[this.transportationType];
    }
  }
};
