
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
        round.setMiss(rs.getInt("miss"));
        round.setPerfect(rs.getInt("perfect"));
        round.setBadShots(rs.getInt("badshot"));
        round.setHorizontalLeft(rs.getInt("horizontal_left"));
        round.setHorizontalCenter(rs.getInt("horizontal_center"));
        round.setHorizontalRight(rs.getInt("horizontal_right"));
        round.setVerticalHigh(rs.getInt("vertical_high"));
        round.setVerticalCenter(rs.getInt("vertical_center"));
        round.setVerticalLow(rs.getInt("vertical_low"));        
        return round;
    }
    
}
