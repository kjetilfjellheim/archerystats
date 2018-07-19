package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.Diary;
import no.fd.archerystats.service.pojo.Round;
import no.fd.archerystats.service.rowmapper.DiaryRowMapper;
import no.fd.archerystats.service.rowmapper.RoundRowMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kjetil
 */
@Repository
public class JdbcDiaryDao implements DiaryDao {
    /**
     * Class logger.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcDiaryDao.class);   
    
    @Autowired
    private DiaryRowMapper diaryRowMapper;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcDiaryDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
   
    public List<Diary> findDiary(String userId, Date fromDate, Date toDate) {
        LOGGER.info("Find diary");
        return this.jdbcTemplate.query("select * from archerystats_v1.diary where id_user = ? and date >= ? and date <= ? order by date", new Object[]{userId, fromDate, toDate}, diaryRowMapper);
    }

    public List<Diary> findDiary(String userId, Date fromDate, Date toDate, Integer spt) {
        LOGGER.info("Find diary");
        return this.jdbcTemplate.query("select * from archerystats_v1.diary where id_user = ? and date >= ? and date <= ? and spt = ? order by date", new Object[]{userId, fromDate, toDate, spt}, diaryRowMapper);
    }

}
