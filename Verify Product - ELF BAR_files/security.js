jQuery(document).ready(function () {
    function ChangeParam(name, value) {
        var url = window.location.href;
        var newUrl = "";
        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
            newUrl = url.replace(eval(reg), tmp);
        }
        else {
            if (url.match("[\?]")) {
                newUrl = url + "&" + tmp;
            }
            else {
                newUrl = url + "?" + tmp;
            }
        }
        location.href = newUrl;
    }
    function verifyValue() {
        var result = true;
        if (!$("#code").val()) {
            $("input[name=code]").addClass("error-tips")
            $("#code-error").css("display","block")
            result = false;
        } else {
            $("input[name=code]").removeClass("error-tips")
            $("#code-error").css("display","none")
        }
        return result;
    }
    $("input[name=code]").bind('input propertychange', function() {
        verifyValue()
    });
    $("#securitySubmit").click(function() {
        var result = verifyValue();
        if (!result) {
            return false;
        }
        var code = $("#code").val()
        ChangeParam("c", code)
    })
});