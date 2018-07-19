
package no.fd.archerystats.service.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

/**
 *
 * @author Kjetil
 */
public class Round {
    private String id;
    private String idUser;
    private String idBow;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")        
    private Date shootDate;
    private Integer round;
    private Boolean missScored;
    private Boolean perfectScored;
    private Boolean badshotScored;
    private Integer miss;
    private Integer perfect;
    private Integer badShots;
    private Integer distance;
    private Integer horizontalLeft;
    private Integer horizontalCenter;
    private Integer horizontalRight;
    private Integer verticalHigh;
    private Integer verticalCenter;
    private Integer verticalLow;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getIdBow() {
        return idBow;
    }

    public void setIdBow(String idBow) {
        this.idBow = idBow;
    }

    public Date getShootDate() {
        return shootDate;
    }

    public void setShootDate(Date shootDate) {
        this.shootDate = shootDate;
    }

    public Integer getRound() {
        return round;
    }

    public void setRound(Integer round) {
        this.round = round;
    }

    public Boolean getMissScored() {
        return missScored;
    }

    public void setMissScored(Boolean missScored) {
        this.missScored = missScored;
    }

    public Boolean getPerfectScored() {
        return perfectScored;
    }

    public void setPerfectScored(Boolean perfectScored) {
        this.perfectScored = perfectScored;
    }

    public Boolean getBadshotScored() {
        return badshotScored;
    }

    public void setBadshotScored(Boolean badshotScored) {
        this.badshotScored = badshotScored;
    }

    public Integer getMiss() {
        return miss;
    }

    public void setMiss(Integer miss) {
        this.miss = miss;
    }

    public Integer getPerfect() {
        return perfect;
    }

    public void setPerfect(Integer perfect) {
        this.perfect = perfect;
    }

    public Integer getBadShots() {
        return badShots;
    }

    public void setBadShots(Integer badShots) {
        this.badShots = badShots;
    }

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Integer getHorizontalLeft() {
        return horizontalLeft;
    }

    public void setHorizontalLeft(Integer horizontalLeft) {
        this.horizontalLeft = horizontalLeft;
    }

    public Integer getHorizontalCenter() {
        return horizontalCenter;
    }

    public void setHorizontalCenter(Integer horizontalCenter) {
        this.horizontalCenter = horizontalCenter;
    }

    public Integer getHorizontalRight() {
        return horizontalRight;
    }

    public void setHorizontalRight(Integer horizontalRight) {
        this.horizontalRight = horizontalRight;
    }

    public Integer getVerticalHigh() {
        return verticalHigh;
    }

    public void setVerticalHigh(Integer verticalHigh) {
        this.verticalHigh = verticalHigh;
    }

    public Integer getVerticalCenter() {
        return verticalCenter;
    }

    public void setVerticalCenter(Integer verticalCenter) {
        this.verticalCenter = verticalCenter;
    }

    public Integer getVerticalLow() {
        return verticalLow;
    }

    public void setVerticalLow(Integer verticalLow) {
        this.verticalLow = verticalLow;
    }
    
    
}
