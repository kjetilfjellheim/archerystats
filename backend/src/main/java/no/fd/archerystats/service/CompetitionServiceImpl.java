package no.fd.archerystats.service;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.dao.CompetitionDao;
import no.fd.archerystats.dao.CompetitionParamDao;
import no.fd.archerystats.service.pojo.Competition;
import no.fd.archerystats.service.pojo.CompetitionParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author kjetilf
 */
@Service
public class CompetitionServiceImpl extends AbstractService implements CompetitionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CompetitionServiceImpl.class);
    
    @Autowired
    private CompetitionDao competitionDao;    

    @Autowired
    private CompetitionParamDao competitionParamDao;    
    
    
    public List<Competition> getCompetitionResults(String idUser, String idParam, Date fromDate, Date toDate) {
        return competitionDao.findResults(idParam, idUser, fromDate, toDate, false);
    }

    public List<CompetitionParam> getCompetitionParams() {
        return competitionParamDao.findAll();
    }

    public List<Competition> getTrainingResults(String idUser, String idParam, Date fromDate, Date toDate) {
        return competitionDao.findResults(idParam, idUser, fromDate, toDate, true);        
    }


}
