
package no.fd.archerystats.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author kjetilf
 */
@Controller
public class IndexHtmlForwardController {

    @RequestMapping({"", "/profile/totals", "/profile/training", "/profile/diarylog", "/profile/competitions", "/profile/overtimestatats", "/main", "/profile"})
    public String index() {
        return "forward:/index.html";
    }

}
