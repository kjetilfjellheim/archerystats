
package no.fd.archerystats.service.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.fd.archerystats.service.pojo.Round;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

/**
 *
 * @author Kjetil
 */
@Component
public class RoundRowMapper implements RowMapper<Round>{

    public Round mapRow(ResultSet rs, int i) throws SQLException {
        Round round = new Round();
        round.setId(rs.getString("id"));
        round.setIdUser(rs.getString("id_user"));
        round.setIdBow(rs.getString("id_bow"));
        round.setShootDate(rs.getDate("shoot_date"));
        round.setMissScored(rs.getBoolean("miss_scored"));
        round.setPerfectScored(rs.getBoolean("perfect_scored"));
        round.setBadshotScored(rs.getBoolean("badshot_scored"));
        int miss = rs.getInt("miss");
        if (!rs.wasNull()) {
            round.setMiss(miss);
        }
        int perfect = rs.getInt("perfect");
        if (!rs.wasNull()) {
            round.setPerfect(perfect);
        }
        int badshots = rs.getInt("badshot");
        if (!rs.wasNull()) {
            round.setBadShots(badshots);
        }
        int horLeft = rs.getInt("horizontal_left");
        if (!rs.wasNull()) {
            round.setHorizontalLeft(horLeft);
        }
        int horCenter = rs.getInt("horizontal_center");
        if (!rs.wasNull()) {
            round.setHorizontalCenter(horCenter);
        }
        int horRight = rs.getInt("horizontal_right");
        if (!rs.wasNull()) {
            round.setHorizontalRight(horRight);
        }
        int verHigh = rs.getInt("vertical_high");
        if (!rs.wasNull()) {
            round.setVerticalHigh(verHigh);
        }
        int verCenter = rs.getInt("vertical_center");
        if (!rs.wasNull()) {
            round.setVerticalCenter(verCenter);
        }
        int verLow = rs.getInt("vertical_low");
        if (!rs.wasNull()) {
            round.setVerticalLow(verLow);        
        }
        return round;
    }
    
}
