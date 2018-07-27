
package no.fd.archerystats.service;

import no.fd.archerystats.service.pojo.User;
import no.fd.archerystats.service.pojo.facebook.SocialToken;

/**
 *
 * @author Kjetil
 */
public interface LoginService {

    User login(SocialToken socialToken);
    
}
