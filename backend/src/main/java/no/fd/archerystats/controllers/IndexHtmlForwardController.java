
package no.fd.archerystats.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author kjetilf
 */
@Controller
public class IndexHtmlForwardController {

    @RequestMapping({"", "/users", "/statistics", "/info"})
    public String index() {
        return "forward:/index.html";
    }

}
