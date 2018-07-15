
package no.fd.archerystats.service.pojo;

/**
 *
 * @author Kjetil
 */
public class Bow {
    private String id;
    private String idUser;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getIdUser() {
        return idUser;
    }
       
}
