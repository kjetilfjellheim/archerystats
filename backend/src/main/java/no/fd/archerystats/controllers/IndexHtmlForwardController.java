
package no.fd.archerystats.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author kjetilf
 */
@Controller
public class IndexHtmlForwardController {

    @RequestMapping({"", "/totals", "/training", "/diarylog", "/competitions", "/overtimestatats"})
    public String index() {
        return "forward:/index.html";
    }

}
