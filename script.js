Number.prototype.format = function (n, x, s, c) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace(".", c) : num).replace(
        new RegExp(re, "g"),
        "$&" + (s || ",")
    );
};

$(function () {
    $.ajax({
        url: "prices.json",
        type: "GET",
        success: function (res) {
            let paket = res.paket;

            for (let i = 0; i < paket.length; i++) {
                let price = paket[i].price;
                let sale_price = paket[i].sale_price;

                $(`.${paket[i].name} .old-price`).html(`Rp. ${price.format()}`);

                if (sale_price >= 1000) {
                    $(`.${paket[i].name} .new-price`).html(
                        `<sup class="sup1">Rp</sup><span>${
                            sale_price.format(0, 3, ".").split(".")[0]
                        }</span><sup class="sup2">.${
                            sale_price.format(0, 3, ".").split(".")[1]
                        }</sup><sup class="sup3">/bln</sup>`
                    );
                } else {
                    $(`.${paket[i].name} .new-price`).html(
                        `<sup class="sup1">Rp</sup><span>${sale_price}</span><sup class="sup3">/bln</sup>`
                    );
                }
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
});
