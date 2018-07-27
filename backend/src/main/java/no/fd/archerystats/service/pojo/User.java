
package no.fd.archerystats.service.pojo;

/**
 *
 * @author Kjetil
 */
public class User {
    private String id;
    private String name;
    private String facebookid;

    public String getFacebookid() {
        return facebookid;
    }

    public void setFacebookid(String facebookid) {
        this.facebookid = facebookid;
    }    
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
       
}


