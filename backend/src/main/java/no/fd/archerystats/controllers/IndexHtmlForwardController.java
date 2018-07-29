
package no.fd.archerystats.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author kjetilf
 */
@Controller
public class IndexHtmlForwardController {

    @RequestMapping({"", "/profile/edittraininglog", "/profile/editcompetitions", "/profile/edittrainingshoot", "/profile/competitions", "/profile/training", "/profile/trainingdiary", "/main", "/profile"})
    public String index() {
        return "forward:/index.html";
    }

}
