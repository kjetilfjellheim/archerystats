
package no.fd.archerystats.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author kjetilf
 */
@Controller
public class IndexHtmlForwardController {

    @RequestMapping({"", "/statistics", "/diary", "/competitions"})
    public String index() {
        return "forward:/index.html";
    }

}
